import type { ControllerContainer } from "./container.js";

export async function bootstrapController(
  container: ControllerContainer,
): Promise<() => void> {
  await container.openclawProcess.prepare();
  container.openclawProcess.enableAutoRestart();
  container.openclawProcess.start();

  // Start WS client — connects to OpenClaw gateway
  container.wsClient.connect();

  // When WS handshake completes, push current config immediately
  container.wsClient.onConnected(() => {
    void container.openclawSyncService.syncAll().catch(() => {});
  });

  await container.openclawSyncService.syncAll();
  return container.startBackgroundLoops();
}
