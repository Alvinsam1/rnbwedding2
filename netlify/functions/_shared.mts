import { neon } from "@neondatabase/serverless";

let sql: ReturnType<typeof neon> | undefined;

/**
 * Neon's HTTP driver — one query per fetch, no persistent connection to
 * manage. This is the recommended way to talk to Postgres from a
 * serverless/edge function (works cleanly with esbuild bundling, no native
 * addons, no connection-pool exhaustion across concurrent invocations).
 */
export function getSql() {
  if (!sql) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error("DATABASE_URL environment variable is not set");
    }
    sql = neon(connectionString);
  }
  return sql;
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
