import type { ControllerEnv } from "../app/env.js";
import { CatalogManager } from "./skillhub/catalog-manager.js";
import { SkillDb } from "./skillhub/skill-db.js";

export class SkillhubService {
  private catalogManager: CatalogManager | null = null;
  private initPromise: Promise<void> | null = null;

  constructor(private readonly env: ControllerEnv) {}

  start(): void {
    this.initPromise = this.init();
    this.initPromise.catch((err) => {
      console.error("[skillhub] init failed:", err);
    });
  }

  private async init(): Promise<void> {
    const skillDb = await SkillDb.create(this.env.skillDbPath);

    this.catalogManager = new CatalogManager(this.env.skillhubCacheDir, {
      skillsDir: this.env.openclawSkillsDir,
      curatedSkillsDir: this.env.openclawCuratedSkillsDir,
      staticSkillsDir: this.env.staticSkillsDir,
      skillDb,
      log: (level, message) => {
        console[level === "error" ? "error" : "log"](`[skillhub] ${message}`);
      },
    });

    this.catalogManager.start();
    if (!process.env.CI) {
      await this.catalogManager.installCuratedSkills();
      this.catalogManager.reconcileDbWithDisk();
    }
  }

  get catalog(): CatalogManager {
    if (!this.catalogManager) {
      throw new Error("SkillhubService not yet initialized");
    }
    return this.catalogManager;
  }

  async waitForReady(): Promise<void> {
    if (this.initPromise) {
      await this.initPromise;
    }
  }

  dispose(): void {
    this.catalogManager?.dispose();
  }
}
