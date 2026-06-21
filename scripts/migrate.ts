import { Database } from "bun:sqlite";
import { existsSync, mkdirSync, readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

type MigrationDirection = "up" | "down";

type MigrationFile = {
  version: string;
  upPath?: string;
  downPath?: string;
};

const dbPath = process.env.DB_PATH ?? "./data/tinynotes.db";
const migrationDirection: MigrationDirection = process.argv.includes("--down") ? "down" : "up";

const dbDirectory = path.dirname(dbPath);
if (dbDirectory !== "." && !existsSync(dbDirectory)) {
  mkdirSync(dbDirectory, { recursive: true });
}

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const migrationDirectory = path.join(scriptDir, "..", "migrations");
const migrationFiles = readdirSync(migrationDirectory)
  .filter((file) => file.endsWith(".sql"))
  .sort();

const migrations = new Map<string, MigrationFile>();
for (const file of migrationFiles) {
  if (file.endsWith(".down.sql")) {
    const version = file.replace(/\.down\.sql$/, "");
    const migration = migrations.get(version) ?? { version };
    migration.downPath = path.join(migrationDirectory, file);
    migrations.set(version, migration);
    continue;
  }

  const version = file.replace(/\.sql$/, "");
  const migration = migrations.get(version) ?? { version };
  migration.upPath = path.join(migrationDirectory, file);
  migrations.set(version, migration);
}

const db = new Database(dbPath);

const normalizeVersion = (value: string) => value.replace(/\.down\.sql$|\.sql$/, "");

const toAppliedVersionsSet = (): Set<string> => {
  const applied = db
    .prepare("SELECT version FROM schema_migrations ORDER BY version ASC;")
    .all() as { version: string }[];
  return new Set(applied.map((row) => normalizeVersion(row.version)));
};

const runInTransaction = (version: string, direction: MigrationDirection, sql: string) => {
  const transaction = db.transaction(() => {
    db.exec(sql);
    if (direction === "up") {
      db.run(
        "INSERT INTO schema_migrations (version, applied_at) VALUES (?, ?)",
        version,
        new Date().toISOString(),
      );
      return;
    }

    db.run(
      "DELETE FROM schema_migrations WHERE version = ? OR version = ? OR version = ?",
      version,
      `${version}.sql`,
      `${version}.down.sql`,
    );
  });

  transaction();
};

const main = () => {
  try {
    db.exec("PRAGMA foreign_keys = ON;");
    db.exec(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        version TEXT PRIMARY KEY,
        applied_at TEXT NOT NULL
      );
    `);

    const appliedVersions = toAppliedVersionsSet();
    const orderedVersions = Array.from(migrations.keys()).sort();

    if (migrationDirection === "up") {
      let appliedCount = 0;

      for (const version of orderedVersions) {
        const migration = migrations.get(version);
        if (!migration?.upPath) {
          throw new Error(`Missing UP migration for ${version}`);
        }

        if (appliedVersions.has(version)) {
          console.log(`Skipping migration: ${version}`);
          continue;
        }

        const sql = readFileSync(migration.upPath, "utf8").trim();
        runInTransaction(version, "up", sql);
        appliedCount += 1;
        console.log(`Applied migration: ${version}`);
      }

      if (appliedCount === 0) {
        console.log("No pending migrations.");
      } else {
        console.log(`Applied ${appliedCount} migration(s).`);
      }

      return;
    }

    const appliedVersionRows = db
      .prepare("SELECT version FROM schema_migrations ORDER BY version DESC")
      .all() as { version: string }[];

    if (appliedVersionRows.length === 0) {
      console.log("No migrations to rollback.");
      return;
    }

    const latestVersion = normalizeVersion(appliedVersionRows[0].version);
    const migration = migrations.get(latestVersion);
    if (!migration?.downPath) {
      throw new Error(`Missing DOWN migration for ${latestVersion}`);
    }

    const sql = readFileSync(migration.downPath, "utf8").trim();
    runInTransaction(latestVersion, "down", sql);
    console.log(`Rolled back migration: ${latestVersion}`);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  } finally {
    db.close();
  }
};

main();
