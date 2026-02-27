import crypto from "node:crypto";
import type { OpenAPIHono } from "@hono/zod-openapi";
import { and, eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { gatewayPools, webhookRoutes } from "../db/schema/index.js";
import type { AppBindings } from "../types.js";

interface WhatsAppWebhookPayload {
  entry?: Array<{
    changes?: Array<{
      value?: {
        metadata?: {
          phone_number_id?: string;
        };
      };
    }>;
  }>;
}

function verifyMetaSignature(
  appSecret: string,
  rawBody: string,
  signatureHeader: string,
): boolean {
  if (!signatureHeader.startsWith("sha256=")) {
    return false;
  }

  const expected = crypto
    .createHmac("sha256", appSecret)
    .update(rawBody)
    .digest("hex");
  const received = signatureHeader.slice("sha256=".length);

  if (received.length !== expected.length) {
    return false;
  }

  return crypto.timingSafeEqual(Buffer.from(received), Buffer.from(expected));
}

function extractPhoneNumberId(payload: WhatsAppWebhookPayload): string | null {
  for (const entry of payload.entry ?? []) {
    for (const change of entry.changes ?? []) {
      const phoneNumberId = change.value?.metadata?.phone_number_id;
      if (phoneNumberId) {
        return phoneNumberId;
      }
    }
  }

  return null;
}

export function registerWhatsAppEvents(app: OpenAPIHono<AppBindings>) {
  app.get("/api/whatsapp/events", async (c) => {
    const mode = c.req.query("hub.mode");
    const verifyToken = c.req.query("hub.verify_token");
    const challenge = c.req.query("hub.challenge");

    const expectedVerifyToken = process.env.WHATSAPP_VERIFY_TOKEN;
    if (!expectedVerifyToken) {
      return c.text("Webhook verify token is not configured", 500);
    }

    if (
      mode === "subscribe" &&
      verifyToken === expectedVerifyToken &&
      challenge
    ) {
      return c.text(challenge, 200);
    }

    return c.text("Forbidden", 403);
  });

  app.on("POST", "/api/whatsapp/events", async (c) => {
    try {
      const appSecret = process.env.WHATSAPP_APP_SECRET;
      if (!appSecret) {
        console.error("[whatsapp-events] missing WHATSAPP_APP_SECRET");
        return c.json({ error: "Server misconfigured" }, 500);
      }

      const signature = c.req.header("x-hub-signature-256") ?? "";
      if (!signature) {
        return c.json({ error: "Missing signature" }, 401);
      }

      const rawBody = await c.req.text();
      if (!verifyMetaSignature(appSecret, rawBody, signature)) {
        return c.json({ error: "Invalid signature" }, 401);
      }

      let payload: WhatsAppWebhookPayload;
      try {
        payload = JSON.parse(rawBody) as WhatsAppWebhookPayload;
      } catch {
        return c.json({ error: "Invalid JSON" }, 400);
      }

      const phoneNumberId = extractPhoneNumberId(payload);
      if (!phoneNumberId) {
        return c.json({ accepted: true }, 202);
      }

      const [route] = await db
        .select()
        .from(webhookRoutes)
        .where(
          and(
            eq(webhookRoutes.channelType, "whatsapp"),
            eq(webhookRoutes.externalId, phoneNumberId),
          ),
        );

      if (!route) {
        return c.json({ error: "Unknown phone number" }, 404);
      }

      const [pool] = await db
        .select({ podIp: gatewayPools.podIp })
        .from(gatewayPools)
        .where(eq(gatewayPools.id, route.poolId));

      const podIp = pool?.podIp;
      if (!podIp) {
        return c.json({ accepted: true }, 202);
      }

      const accountId = route.accountId ?? `whatsapp-${phoneNumberId}`;
      const gatewayUrl = `http://${podIp}:18789/whatsapp/events/${accountId}`;

      const gatewayResp = await fetch(gatewayUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-hub-signature-256": signature,
        },
        body: rawBody,
      });

      const respBody = await gatewayResp.text();
      return new Response(respBody, {
        status: gatewayResp.status,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("[whatsapp-events] unhandled error", {
        error: error instanceof Error ? error.message : "unknown_error",
      });
      return c.json({ accepted: true }, 202);
    }
  });
}
