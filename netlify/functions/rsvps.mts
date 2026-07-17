import type { Config } from "@netlify/functions";
import { getPool, jsonResponse, requireAdmin } from "./_shared.mts";

const RSVP_COLUMNS = `
  id,
  full_name   as "fullName",
  email,
  attending,
  guest_count as "guestCount",
  song_request as "songRequest",
  message,
  created_at  as "createdAt"
`;

export default async (req: Request) => {
  if (req.method === "GET") {
    // Guest RSVP data is personal (name + email) — only the admin page,
    // authenticated with ADMIN_PASSWORD, may list it.
    const unauthorized = requireAdmin(req);
    if (unauthorized) return unauthorized;

    const pool = getPool();
    const { rows } = await pool.query(
      `select ${RSVP_COLUMNS} from rsvps order by created_at desc`,
    );
    return jsonResponse(rows);
  }

  if (req.method === "POST") {
    // Public: this is the guest-facing RSVP form submission.
    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return jsonResponse({ error: "Invalid JSON body" }, { status: 400 });
    }

    const fullName = typeof body.fullName === "string" ? body.fullName.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const attending = typeof body.attending === "boolean" ? body.attending : null;
    const guestCount =
      typeof body.guestCount === "number" && Number.isInteger(body.guestCount)
        ? body.guestCount
        : 1;
    const songRequest = typeof body.songRequest === "string" ? body.songRequest : null;
    const message = typeof body.message === "string" ? body.message : null;

    if (!fullName || fullName.length < 2) {
      return jsonResponse({ error: "fullName is required" }, { status: 400 });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonResponse({ error: "A valid email is required" }, { status: 400 });
    }
    if (attending === null) {
      return jsonResponse({ error: "attending is required" }, { status: 400 });
    }
    if (guestCount < 1 || guestCount > 10) {
      return jsonResponse({ error: "guestCount must be between 1 and 10" }, { status: 400 });
    }

    const pool = getPool();
    const { rows } = await pool.query(
      `insert into rsvps (full_name, email, attending, guest_count, song_request, message)
       values ($1, $2, $3, $4, $5, $6)
       returning ${RSVP_COLUMNS}`,
      [fullName, email, attending, guestCount, songRequest, message],
    );
    return jsonResponse(rows[0], { status: 201 });
  }

  return new Response("Method Not Allowed", { status: 405 });
};

export const config: Config = { path: "/api/rsvps" };
