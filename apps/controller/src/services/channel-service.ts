import { existsSync } from "node:fs";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import type {
  BotQuotaResponse,
  ChannelResponse,
  ConnectDiscordInput,
  ConnectFeishuInput,
  ConnectSlackInput,
  ConnectTelegramInput,
} from "@nexu/shared";
import type { ControllerEnv } from "../app/env.js";
import type { NexuConfigStore } from "../store/nexu-config-store.js";
import type { OpenClawSyncService } from "./openclaw-sync-service.js";

function timeoutSignal(ms: number): AbortSignal {
  return AbortSignal.timeout(ms);
}

const DEFAULT_WHATSAPP_ACCOUNT_ID = "default";

type TelegramGetMeResponse = {
  ok: boolean;
  description?: string;
  result?: {
    id?: number;
    username?: string;
    first_name?: string;
  };
};

type WhatsappLoginModule = {
  startWebLoginWithQr: (opts?: {
    verbose?: boolean;
    timeoutMs?: number;
    force?: boolean;
    accountId?: string;
  }) => Promise<{ qrDataUrl?: string; message: string }>;
  waitForWebLogin: (opts?: {
    timeoutMs?: number;
    accountId?: string;
  }) => Promise<{ connected: boolean; message: string }>;
};

function isFsPath(value: string): boolean {
  return value.includes(path.sep) || value.startsWith(".");
}

function resolveOpenClawPackageDir(env: ControllerEnv): string {
  const candidates = isFsPath(env.openclawBin)
    ? [
        path.resolve(
          path.dirname(path.resolve(env.openclawBin)),
          "..",
          "node_modules",
          "openclaw",
        ),
        path.resolve(
          path.dirname(path.resolve(env.openclawBin)),
          "openclaw-runtime",
          "node_modules",
          "openclaw",
        ),
      ]
    : [
        path.resolve(
          process.cwd(),
          "openclaw-runtime",
          "node_modules",
          "openclaw",
        ),
      ];

  const matched = candidates.find((candidate) =>
    existsSync(path.join(candidate, "package.json")),
  );
  if (!matched) {
    throw new Error("OpenClaw package root not found for WhatsApp login");
  }
  return matched;
}

async function loadWhatsappLoginModule(
  env: ControllerEnv,
): Promise<WhatsappLoginModule> {
  const pluginSdkDir = path.join(
    resolveOpenClawPackageDir(env),
    "dist",
    "plugin-sdk",
  );
  const entries = await readdir(pluginSdkDir);
  const loginChunk = entries
    .filter(
      (entry) =>
        entry.startsWith("login-qr-") && entry.toLowerCase().endsWith(".js"),
    )
    .sort()[0];

  if (!loginChunk) {
    throw new Error("OpenClaw WhatsApp login module not found");
  }

  const modulePath = path.join(pluginSdkDir, loginChunk);
  const loaded = (await import(pathToFileURL(modulePath).href)) as unknown;
  if (
    typeof loaded !== "object" ||
    loaded === null ||
    !("startWebLoginWithQr" in loaded) ||
    !("waitForWebLogin" in loaded)
  ) {
    throw new Error("OpenClaw WhatsApp login module is invalid");
  }
  return loaded as WhatsappLoginModule;
}

export class ChannelService {
  constructor(
    private readonly env: ControllerEnv,
    private readonly configStore: NexuConfigStore,
    private readonly syncService: OpenClawSyncService,
  ) {}

  async listChannels() {
    return this.configStore.listChannels();
  }

  async getChannel(channelId: string): Promise<ChannelResponse | null> {
    return this.configStore.getChannel(channelId);
  }

  async getBotQuota(): Promise<BotQuotaResponse> {
    return {
      available: true,
      resetsAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    };
  }

  async connectSlack(input: ConnectSlackInput) {
    const authResp = await fetch("https://slack.com/api/auth.test", {
      headers: { Authorization: `Bearer ${input.botToken}` },
      signal: timeoutSignal(5000),
    });
    const authData = (await authResp.json()) as {
      ok: boolean;
      team_id?: string;
      team?: string;
      bot_id?: string;
      user_id?: string;
      error?: string;
    };
    if (!authData.ok || !authData.team_id) {
      throw new Error(
        `Invalid Slack bot token: ${authData.error ?? "auth.test failed"}`,
      );
    }

    let appId = input.appId;
    if (!appId && authData.bot_id) {
      const botInfoResp = await fetch(
        `https://slack.com/api/bots.info?bot=${authData.bot_id}`,
        {
          headers: { Authorization: `Bearer ${input.botToken}` },
          signal: timeoutSignal(5000),
        },
      );
      const botInfo = (await botInfoResp.json()) as {
        ok: boolean;
        bot?: { app_id?: string };
      };
      appId = botInfo.bot?.app_id;
    }

    if (!appId) {
      throw new Error("Could not resolve Slack app id from bot token");
    }

    const channel = await this.configStore.connectSlack({
      ...input,
      teamId: input.teamId ?? authData.team_id,
      teamName: input.teamName ?? authData.team,
      appId,
      botUserId: authData.user_id ?? null,
    });
    await this.syncService.writePlatformTemplatesForBot(channel.botId);
    await this.syncService.syncAll();
    return channel;
  }

  async connectDiscord(input: ConnectDiscordInput) {
    const userResp = await fetch("https://discord.com/api/v10/users/@me", {
      headers: { Authorization: `Bot ${input.botToken}` },
      signal: timeoutSignal(5000),
    });
    if (!userResp.ok) {
      throw new Error(
        userResp.status === 401
          ? "Invalid Discord bot token"
          : `Discord API error (${userResp.status})`,
      );
    }

    const userData = (await userResp.json()) as { id?: string };

    const appResp = await fetch(
      "https://discord.com/api/v10/applications/@me",
      {
        headers: { Authorization: `Bot ${input.botToken}` },
        signal: timeoutSignal(5000),
      },
    );
    if (appResp.ok) {
      const appData = (await appResp.json()) as { id: string };
      if (appData.id !== input.appId) {
        throw new Error(
          `Application ID mismatch: token belongs to ${appData.id}, but ${input.appId} was provided`,
        );
      }
    }

    const channel = await this.configStore.connectDiscord({
      ...input,
      botUserId: userData.id ?? null,
    });
    await this.syncService.writePlatformTemplatesForBot(channel.botId);
    await this.syncService.syncAll();
    return channel;
  }

  async connectWechat(accountId: string) {
    const channel = await this.configStore.connectWechat({ accountId });
    await this.syncService.writePlatformTemplatesForBot(channel.botId);
    await this.syncService.syncAll();
    return channel;
  }

  async connectTelegram(input: ConnectTelegramInput) {
    const response = await fetch(
      `https://api.telegram.org/bot${encodeURIComponent(input.botToken)}/getMe`,
      {
        signal: timeoutSignal(5000),
      },
    );
    if (!response.ok) {
      throw new Error(
        response.status === 401
          ? "Invalid Telegram bot token"
          : `Telegram API error (${response.status})`,
      );
    }

    const payload = (await response.json()) as TelegramGetMeResponse;
    if (!payload.ok || !payload.result?.id) {
      throw new Error(payload.description ?? "Invalid Telegram bot token");
    }

    const channel = await this.configStore.connectTelegram({
      botToken: input.botToken,
      telegramBotId: String(payload.result.id),
      botUsername: payload.result.username ?? null,
      displayName:
        payload.result.username?.trim() ||
        payload.result.first_name?.trim() ||
        null,
    });
    await this.syncService.writePlatformTemplatesForBot(channel.botId);
    await this.syncService.syncAll();
    return channel;
  }

  async whatsappQrStart() {
    const login = await loadWhatsappLoginModule(this.env);
    const result = await login.startWebLoginWithQr({
      accountId: DEFAULT_WHATSAPP_ACCOUNT_ID,
      timeoutMs: 30_000,
    });
    const alreadyLinked =
      !result.qrDataUrl &&
      result.message.toLowerCase().includes("already linked");
    return {
      ...result,
      accountId: DEFAULT_WHATSAPP_ACCOUNT_ID,
      alreadyLinked,
    };
  }

  async whatsappQrWait(accountId: string) {
    const login = await loadWhatsappLoginModule(this.env);
    const result = await login.waitForWebLogin({
      accountId,
      timeoutMs: 500_000,
    });
    return {
      ...result,
      accountId,
    };
  }

  async connectWhatsapp(accountId: string) {
    const channel = await this.configStore.connectWhatsapp({ accountId });
    await this.syncService.writePlatformTemplatesForBot(channel.botId);
    await this.syncService.syncAll();
    return channel;
  }

  async connectFeishu(input: ConnectFeishuInput) {
    const response = await fetch(
      "https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          app_id: input.appId,
          app_secret: input.appSecret,
        }),
        signal: timeoutSignal(5000),
      },
    );
    const payload = (await response.json()) as { code?: number; msg?: string };
    if (!response.ok || payload.code !== 0) {
      throw new Error(
        `Invalid Feishu credentials: ${payload.msg ?? `HTTP ${response.status}`}`,
      );
    }

    const channel = await this.configStore.connectFeishu(input);
    await this.syncService.writePlatformTemplatesForBot(channel.botId);
    await this.syncService.syncAll();
    return channel;
  }

  async disconnectChannel(channelId: string) {
    const removed = await this.configStore.disconnectChannel(channelId);
    if (removed) {
      await this.syncService.syncAll();
    }
    return removed;
  }
}
