import { createRoute, z } from "@hono/zod-openapi";
import type { OpenAPIHono } from "@hono/zod-openapi";
import {
  modelProviderListResponseSchema,
  modelProviderResponseSchema,
  upsertModelProviderRequestSchema,
} from "@nexu/shared";
import { and, eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { bots, gatewayPools } from "../db/schema/index.js";
import { BaseError, ServiceError } from "../lib/error.js";
import { publishPoolConfigSnapshot } from "../services/runtime/pool-config-service.js";
import {
  listPoolModelProviders,
  upsertPoolModelProvider,
} from "../services/runtime/pool-model-provider-service.js";
import type { AppBindings } from "../types.js";

const errorResponseSchema = z.object({
  message: z.string(),
});

const poolProviderParamsSchema = z.object({
  poolId: z.string(),
  providerKey: z.string().min(1),
});

const poolIdParamSchema = z.object({
  poolId: z.string(),
});

const listPoolModelProvidersRoute = createRoute({
  method: "get",
  path: "/api/v1/pools/{poolId}/model-providers",
  tags: ["Pools", "Models"],
  request: {
    params: poolIdParamSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": { schema: modelProviderListResponseSchema },
      },
      description: "Pool model providers",
    },
    404: {
      content: { "application/json": { schema: errorResponseSchema } },
      description: "Pool not found",
    },
  },
});

const upsertPoolModelProviderRoute = createRoute({
  method: "put",
  path: "/api/v1/pools/{poolId}/model-providers/{providerKey}",
  tags: ["Pools", "Models"],
  request: {
    params: poolProviderParamsSchema,
    body: {
      content: {
        "application/json": { schema: upsertModelProviderRequestSchema },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": { schema: modelProviderResponseSchema },
      },
      description: "Pool model provider updated",
    },
    400: {
      content: { "application/json": { schema: errorResponseSchema } },
      description: "Invalid model provider payload",
    },
    404: {
      content: { "application/json": { schema: errorResponseSchema } },
      description: "Pool not found",
    },
  },
});

async function assertUserOwnsPool(
  userId: string,
  poolId: string,
): Promise<boolean> {
  const [ownedBot] = await db
    .select({ id: bots.id })
    .from(bots)
    .where(and(eq(bots.userId, userId), eq(bots.poolId, poolId)))
    .limit(1);

  return Boolean(ownedBot);
}

function isDesktopLocalPool(poolId: string): boolean {
  return poolId === (process.env.NEXU_GATEWAY_POOL_ID ?? "desktop-local-pool");
}

async function assertPoolExists(poolId: string): Promise<boolean> {
  const [pool] = await db
    .select({ id: gatewayPools.id })
    .from(gatewayPools)
    .where(eq(gatewayPools.id, poolId))
    .limit(1);

  return Boolean(pool);
}

export function registerPoolModelProviderRoutes(app: OpenAPIHono<AppBindings>) {
  app.openapi(listPoolModelProvidersRoute, async (c) => {
    const { poolId } = c.req.valid("param");
    const userId = c.get("userId");

    if (
      !(await assertPoolExists(poolId)) ||
      (!(await assertUserOwnsPool(userId, poolId)) &&
        !isDesktopLocalPool(poolId))
    ) {
      return c.json({ message: `Pool ${poolId} not found` }, 404);
    }

    const providers = await listPoolModelProviders(db, poolId);
    return c.json({ providers }, 200);
  });

  app.openapi(upsertPoolModelProviderRoute, async (c) => {
    const { poolId, providerKey } = c.req.valid("param");
    const input = c.req.valid("json");
    const userId = c.get("userId");

    if (
      !(await assertPoolExists(poolId)) ||
      (!(await assertUserOwnsPool(userId, poolId)) &&
        !isDesktopLocalPool(poolId))
    ) {
      return c.json({ message: `Pool ${poolId} not found` }, 404);
    }

    try {
      const provider = await upsertPoolModelProvider(
        db,
        poolId,
        providerKey,
        input,
      );
      await publishPoolConfigSnapshot(db, poolId);
      return c.json(provider, 200);
    } catch (error) {
      if (
        error instanceof ServiceError &&
        error.context.code === "api_key_required"
      ) {
        return c.json(
          { message: "API key is required when creating a model provider" },
          400,
        );
      }

      const baseError = BaseError.from(error);
      throw ServiceError.from(
        "pool-model-provider-routes",
        {
          code: "upsert_pool_model_provider_failed",
          message: baseError.message,
          pool_id: poolId,
          provider_key: providerKey,
        },
        { cause: baseError },
      );
    }
  });
}
