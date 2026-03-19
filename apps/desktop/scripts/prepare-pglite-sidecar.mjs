import { cp, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import {
  copyRuntimeDependencyClosure,
  electronRoot,
  getSidecarRoot,
  linkOrCopyDirectory,
  pathExists,
  removePathIfExists,
  repoRoot,
  resetDir,
  shouldCopyRuntimeDependencies,
} from "./lib/sidecar-paths.mjs";

const sidecarRoot = getSidecarRoot("pglite");
const sidecarNodeModules = resolve(sidecarRoot, "node_modules");
const electronNodeModules = resolve(electronRoot, "node_modules");
const migrationsRoot = resolve(repoRoot, "apps/api/migrations");

async function preparePgliteSidecar() {
  if (!(await pathExists(electronNodeModules))) {
    throw new Error(
      "Missing electron/node_modules. Install electron dependencies first.",
    );
  }

  await resetDir(sidecarRoot);

  await writeFile(
    resolve(sidecarRoot, "package.json"),
    `${JSON.stringify({ name: "pglite-sidecar", private: true, type: "module" }, null, 2)}\n`,
  );

  await writeFile(
    resolve(sidecarRoot, "index.js"),
    `import { readdir, readFile, rename, unlink, stat, mkdir } from "node:fs/promises";
import { join, resolve } from "node:path";
import { PGlite } from "@electric-sql/pglite";
import { PGLiteSocketServer } from "@electric-sql/pglite-socket";

const host = process.env.PGLITE_HOST ?? "127.0.0.1";
const port = Number.parseInt(process.env.PGLITE_PORT ?? "50832", 10);
const dataDir = process.env.PGLITE_DATA_DIR;
const migrationsDir = process.env.PGLITE_MIGRATIONS_DIR;

if (!dataDir) {
  throw new Error("PGLITE_DATA_DIR is required.");
}

// Clean up stale postmaster.pid left behind by crashes / force-quit.
// PGlite uses a virtual PID so we can always safely remove it on startup.
const pidPath = join(dataDir, "postmaster.pid");
try {
  await stat(pidPath);
  await unlink(pidPath);
  console.log(JSON.stringify({ event: "pglite_stale_pid_removed", pidPath }));
} catch {
  // File doesn't exist — nothing to clean up
}

console.log(
  JSON.stringify({
    event: "pglite_boot",
    dataDir,
    migrationsDir,
    host,
    port,
  })
);

// Try to open PGlite; if the data directory is corrupted (e.g. from a crash),
// move it aside and start fresh so the desktop app can self-heal.
let db;
try {
  db = await PGlite.create({ dataDir });
} catch (initError) {
  const backupPath = dataDir + ".corrupted-" + Date.now();
  // TODO: report this corruption event to telemetry so we can track frequency and root causes
  console.error(JSON.stringify({
    event: "pglite_data_corrupted",
    error: initError?.message ?? String(initError),
    backupPath,
  }));
  try {
    await rename(dataDir, backupPath);
  } catch {
    // rename failed — directory may already be gone
  }
  await mkdir(dataDir, { recursive: true });
  db = await PGlite.create({ dataDir });
  console.log(JSON.stringify({
    event: "pglite_recovered_fresh_start",
    userNotice: true,
    title: "Local database reset",
    message: "The local database was corrupted due to an unexpected shutdown and has been automatically reset. Your previous data has been backed up. Cloud-synced data (channels, bots) will be restored automatically. You may need to reconfigure local-only settings.",
    backupPath,
  }));
}

async function runMigrations() {
  if (!migrationsDir) {
    return;
  }

  await db.exec(\`create table if not exists desktop_sidecar_migrations (
    name text primary key,
    applied_at text not null
  )\`);

  const rows = await db.query("select name from desktop_sidecar_migrations");
  const applied = new Set(rows.rows.map((row) => row.name));
  const files = (await readdir(migrationsDir))
    .filter((name) => name.endsWith(".sql"))
    .sort();

  for (const file of files) {
    if (applied.has(file)) {
      continue;
    }

    const sql = await readFile(join(migrationsDir, file), "utf8");
    const statements = sql
      .split("--> statement-breakpoint")
      .map((statement) => statement.trim())
      .filter(Boolean);

    for (const statement of statements) {
      await db.exec(statement);
    }

      await db.query("insert into desktop_sidecar_migrations (name, applied_at) values ($1, $2)", [
        file,
        new Date().toISOString(),
      ]);
    console.log(\`Applied migration \${file}\`);
  }
}

await runMigrations();

const server = new PGLiteSocketServer({
  db,
  host,
  port,
  maxConnections: 32,
});

server.addEventListener("listening", (event) => {
  const detail = event.detail ?? { host, port };
  console.log(\`PGLiteSocketServer listening on \${JSON.stringify(detail)}\`);
});

await server.start();

async function shutdown() {
  await server.stop();
  await db.close();
  process.exit(0);
}

process.on("SIGTERM", () => {
  void shutdown();
});

process.on("SIGINT", () => {
  void shutdown();
});
`,
  );

  if (await pathExists(migrationsRoot)) {
    await cp(migrationsRoot, resolve(sidecarRoot, "migrations"), {
      recursive: true,
    });
  }

  if (shouldCopyRuntimeDependencies()) {
    await copyRuntimeDependencyClosure({
      packageRoot: electronRoot,
      targetNodeModules: sidecarNodeModules,
      dependencyNames: ["@electric-sql/pglite", "@electric-sql/pglite-socket"],
    });
  } else {
    await linkOrCopyDirectory(electronNodeModules, sidecarNodeModules);
    await removePathIfExists(resolve(sidecarNodeModules, "electron"));
    await removePathIfExists(resolve(sidecarNodeModules, "electron-builder"));
  }
}

await preparePgliteSidecar();
