import { Router, type IRouter } from "express";
import { desc, eq, sql } from "drizzle-orm";
import { db, rsvpsTable } from "@workspace/db";
import {
  CreateRsvpBody,
  ListRsvpsResponse,
  GetRsvpSummaryResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/rsvps", async (_req, res): Promise<void> => {
  const rsvps = await db
    .select()
    .from(rsvpsTable)
    .orderBy(desc(rsvpsTable.createdAt));
  res.json(ListRsvpsResponse.parse(rsvps));
});

router.get("/rsvps/summary", async (_req, res): Promise<void> => {
  const [row] = await db
    .select({
      totalResponses: sql<number>`count(*)`,
      attendingCount: sql<number>`count(*) filter (where ${rsvpsTable.attending} = true)`,
      notAttendingCount: sql<number>`count(*) filter (where ${rsvpsTable.attending} = false)`,
      totalGuests: sql<number>`coalesce(sum(${rsvpsTable.guestCount}) filter (where ${rsvpsTable.attending} = true), 0)`,
    })
    .from(rsvpsTable);

  res.json(
    GetRsvpSummaryResponse.parse({
      totalResponses: Number(row?.totalResponses ?? 0),
      attendingCount: Number(row?.attendingCount ?? 0),
      notAttendingCount: Number(row?.notAttendingCount ?? 0),
      totalGuests: Number(row?.totalGuests ?? 0),
    }),
  );
});

router.post("/rsvps", async (req, res): Promise<void> => {
  const parsed = CreateRsvpBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.message }, "Invalid RSVP body");
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [rsvp] = await db.insert(rsvpsTable).values(parsed.data).returning();
  res.status(201).json(rsvp);
});

export default router;
