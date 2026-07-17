import pg from "pg";

const { Pool } = pg;

let pool: pg.Pool | undefined;

/**
 * Reuses a single connection pool across warm function invocations.
 * `max: 1` keeps this friendly to serverless — each concurrent invocation
 * gets its own process, so we don't want to open a big pool per instance.
 */
export function getPool(): pg.Pool {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error("DATABASE_URL environment variable is not set");
    }
    pool = new Pool({
      connectionString,
      // Most hosted Postgres providers (Neon, Supabase, Render) require SSL
      // and use certs that Node won't validate by default.
      ssl: connectionString.includes("sslmode=disable")
        ? false
        : { rejectUnauthorized: false },
      max: 1,
    });
  }
  return pool;
}

export function jsonResponse(data: unknown, init: ResponseInit = {}): Response {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: { "content-type": "application/json", ...init.headers },
  });
}

/** Checks the `Authorization: Bearer <ADMIN_PASSWORD>` header used to gate admin-only reads. */
export function isAdminAuthorized(req: Request): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;

  const header = req.headers.get("authorization") || "";
  const match = header.match(/^Bearer\s+(.+)$/i);
  if (!match) return false;

  return match[1] === expected;
}

export function requireAdmin(req: Request): Response | null {
  if (!isAdminAuthorized(req)) {
    return jsonResponse({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
