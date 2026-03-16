import { z } from "zod";

export const modelProviderStatusSchema = z.enum(["active", "disabled"]);

export const modelProviderModelSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).optional(),
  reasoning: z.boolean().optional(),
  input: z.array(z.string().min(1)).optional(),
  contextWindow: z.number().int().positive().optional(),
  maxTokens: z.number().int().positive().optional(),
});

export const upsertModelProviderRequestSchema = z.object({
  baseUrl: z.string().min(1),
  apiType: z.string().min(1).default("openai-completions"),
  apiKey: z.string().min(1).optional(),
  models: z.array(modelProviderModelSchema).default([]),
  status: modelProviderStatusSchema.default("active"),
});

export const modelProviderResponseSchema = z.object({
  id: z.string(),
  poolId: z.string(),
  providerKey: z.string(),
  baseUrl: z.string(),
  apiType: z.string(),
  models: z.array(modelProviderModelSchema),
  status: modelProviderStatusSchema,
  hasApiKey: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const modelProviderListResponseSchema = z.object({
  providers: z.array(modelProviderResponseSchema),
});

export type ModelProviderStatus = z.infer<typeof modelProviderStatusSchema>;
export type ModelProviderModel = z.infer<typeof modelProviderModelSchema>;
export type UpsertModelProviderRequest = z.infer<
  typeof upsertModelProviderRequestSchema
>;
export type ModelProviderResponse = z.infer<typeof modelProviderResponseSchema>;
export type ModelProviderListResponse = z.infer<
  typeof modelProviderListResponseSchema
>;
