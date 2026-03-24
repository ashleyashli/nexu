import { cp, lstat, mkdir, readdir } from "node:fs/promises";
import path, { basename } from "node:path";
import type { ControllerEnv } from "../app/env.js";

function isNodeModulesBinPath(source: string): boolean {
  const segments = path.normalize(source).split(path.sep);
  return (
    segments.length >= 2 &&
    segments.at(-2) === "node_modules" &&
    segments.at(-1) === ".bin"
  );
}

export class OpenClawRuntimePluginWriter {
  constructor(private readonly env: ControllerEnv) {}

  async ensurePlugins(): Promise<void> {
    await mkdir(this.env.openclawExtensionsDir, { recursive: true });

    let entries: import("node:fs").Dirent[];
    try {
      entries = await readdir(this.env.runtimePluginTemplatesDir, {
        withFileTypes: true,
      });
    } catch (err: unknown) {
      if ((err as NodeJS.ErrnoException).code === "ENOENT") {
        return;
      }
      throw err;
    }

    for (const entry of entries) {
      if (!entry.isDirectory()) {
        continue;
      }

      const sourceDir = path.join(
        this.env.runtimePluginTemplatesDir,
        entry.name,
      );
      const targetDir = path.join(this.env.openclawExtensionsDir, entry.name);
      await cp(sourceDir, targetDir, {
        recursive: true,
        force: true,
        dereference: true,
        filter: async (source) => {
          if (!isNodeModulesBinPath(source) || basename(source) !== ".bin") {
            return true;
          }

          const stat = await lstat(source);
          return !stat.isSymbolicLink();
        },
      });
    }
  }
}
