import type { Config } from "@netlify/functions";
import { getSql, jsonResponse, requireAdmin } from "./_shared.mts";

export default async (req: Request) => {
  const sql = getSql();

  if (req.method === "GET") {
    // Guest RSVP data is personal (name + email) — only the admin page,
    // authenticated with ADMIN_PASSWORD, may list it.
    const unauthorized = requireAdmin(req);
    if (unauthorized) return unauthorized;

    const rows = await sql`
      select
        id,
        full_name    as "fullName",
        email,
        attending,
        guest_count  as "guestCount",
        song_request as "songRequest",
        message,
        created_at   as "createdAt"
      from rsvps
      order by created_at desc
    `;
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

    const rows = await sql`
      insert into rsvps (full_name, email, attending, guest_count, song_request, message)
      values (${fullName}, ${email}, ${attending}, ${guestCount}, ${songRequest}, ${message})
      returning
        id,
        full_name    as "fullName",
        email,
        attending,
        guest_count  as "guestCount",
        song_request as "songRequest",
        message,
        created_at   as "createdAt"
    `;
    return jsonResponse(rows[0], { status: 201 });
  }

  return new Response("Method Not Allowed", { status: 405 });
};

export const config: Config = { path: "/api/rsvps" };
