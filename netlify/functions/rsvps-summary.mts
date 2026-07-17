import type { Config } from "@netlify/functions";
import { getPool, jsonResponse, requireAdmin } from "./_shared.mts";

export default async (req: Request) => {
  if (req.method !== "GET") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  const pool = getPool();
  const { rows } = await pool.query(`
    select
      count(*)::int as "totalResponses",
      count(*) filter (where attending = true)::int as "attendingCount",
      count(*) filter (where attending = false)::int as "notAttendingCount",
      coalesce(sum(guest_count) filter (where attending = true), 0)::int as "totalGuests"
    from rsvps
  `);

  return jsonResponse(
    rows[0] ?? {
      totalResponses: 0,
      attendingCount: 0,
      notAttendingCount: 0,
      totalGuests: 0,
    },
  );
};

export const config: Config = { path: "/api/rsvps/summary" };
