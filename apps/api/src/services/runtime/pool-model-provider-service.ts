import type {
  ModelProviderModel,
  ModelProviderResponse,
  UpsertModelProviderRequest,
} from "@nexu/shared";
import { createId } from "@paralleldrive/cuid2";
import { and, eq } from "drizzle-orm";
import type { Database } from "../../db/index.js";
import { poolModelProviders } from "../../db/schema/index.js";
import { decrypt, encrypt } from "../../lib/crypto.js";
import { ServiceError } from "../../lib/error.js";

function parseModelsJson(raw: string): ModelProviderModel[] {
  try {
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as ModelProviderModel[]) : [];
  } catch {
    return [];
  }
}

function toResponse(
  row: typeof poolModelProviders.$inferSelect,
): ModelProviderResponse {
  return {
    id: row.id,
    poolId: row.poolId,
    providerKey: row.providerKey,
    baseUrl: row.baseUrl,
    apiType: row.apiType,
    models: parseModelsJson(row.modelsJson),
    status: row.status === "disabled" ? "disabled" : "active",
    hasApiKey: Boolean(row.encryptedApiKey),
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

export async function listPoolModelProviders(
  db: Database,
  poolId: string,
): Promise<ModelProviderResponse[]> {
  const rows = await db
    .select()
    .from(poolModelProviders)
    .where(eq(poolModelProviders.poolId, poolId));

  return rows.map(toResponse);
}

export async function upsertPoolModelProvider(
  db: Database,
  poolId: string,
  providerKey: string,
  input: UpsertModelProviderRequest,
): Promise<ModelProviderResponse> {
  const [existing] = await db
    .select()
    .from(poolModelProviders)
    .where(
      and(
        eq(poolModelProviders.poolId, poolId),
        eq(poolModelProviders.providerKey, providerKey),
      ),
    )
    .limit(1);

  const now = new Date().toISOString();
  const encryptedApiKey =
    input.apiKey !== undefined
      ? encrypt(input.apiKey)
      : (existing?.encryptedApiKey ?? null);

  if (!existing && !encryptedApiKey) {
    throw ServiceError.from("pool-model-provider-service", {
      code: "api_key_required",
      message: "An API key is required when creating a model provider",
      pool_id: poolId,
      provider_key: providerKey,
    });
  }

  if (existing) {
    await db
      .update(poolModelProviders)
      .set({
        baseUrl: input.baseUrl,
        apiType: input.apiType,
        encryptedApiKey,
        modelsJson: JSON.stringify(input.models),
        status: input.status,
        updatedAt: now,
      })
      .where(eq(poolModelProviders.id, existing.id));

    return {
      ...toResponse({
        ...existing,
        baseUrl: input.baseUrl,
        apiType: input.apiType,
        encryptedApiKey,
        modelsJson: JSON.stringify(input.models),
        status: input.status,
        updatedAt: now,
      }),
    };
  }

  const row: typeof poolModelProviders.$inferSelect = {
    pk: 0,
    id: createId(),
    poolId,
    providerKey,
    baseUrl: input.baseUrl,
    apiType: input.apiType,
    encryptedApiKey,
    modelsJson: JSON.stringify(input.models),
    status: input.status,
    createdAt: now,
    updatedAt: now,
  };

  await db.insert(poolModelProviders).values({
    id: row.id,
    poolId: row.poolId,
    providerKey: row.providerKey,
    baseUrl: row.baseUrl,
    apiType: row.apiType,
    encryptedApiKey: row.encryptedApiKey,
    modelsJson: row.modelsJson,
    status: row.status,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  });

  return toResponse(row);
}

export async function buildPoolModelProvidersConfig(
  db: Database,
  poolId: string,
): Promise<{
  config: {
    mode: "merge";
    providers: Record<
      string,
      {
        baseUrl: string;
        apiKey: string;
        api: string;
        models: Array<{
          id: string;
          name?: string;
          reasoning?: boolean;
          input?: string[];
          contextWindow?: number;
          maxTokens?: number;
          compat: { supportsStore: false };
          cost: {
            input: number;
            output: number;
            cacheRead: number;
            cacheWrite: number;
          };
        }>;
      }
    >;
  } | null;
  hasLitellmProvider: boolean;
}> {
  const rows = await db
    .select()
    .from(poolModelProviders)
    .where(
      and(
        eq(poolModelProviders.poolId, poolId),
        eq(poolModelProviders.status, "active"),
      ),
    );

  if (rows.length === 0) {
    return { config: null, hasLitellmProvider: false };
  }

  const providers: Record<
    string,
    {
      baseUrl: string;
      apiKey: string;
      api: string;
      models: Array<{
        id: string;
        name?: string;
        reasoning?: boolean;
        input?: string[];
        contextWindow?: number;
        maxTokens?: number;
        compat: { supportsStore: false };
        cost: {
          input: number;
          output: number;
          cacheRead: number;
          cacheWrite: number;
        };
      }>;
    }
  > = {};

  for (const row of rows) {
    const apiKey = row.encryptedApiKey ? decrypt(row.encryptedApiKey) : "";
    providers[row.providerKey] = {
      baseUrl: row.baseUrl,
      apiKey,
      api: row.apiType,
      models: parseModelsJson(row.modelsJson).map((model) => ({
        id: model.id,
        name: model.name,
        reasoning: model.reasoning,
        input: model.input,
        contextWindow: model.contextWindow,
        maxTokens: model.maxTokens,
        compat: { supportsStore: false },
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
      })),
    };
  }

  return {
    config: {
      mode: "merge",
      providers,
    },
    hasLitellmProvider: "litellm" in providers,
  };
}
