import { Router, type IRouter } from "express";
import { desc } from "drizzle-orm";
import { db, guestMessagesTable } from "@workspace/db";
import { CreateMessageBody, ListMessagesResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/messages", async (_req, res): Promise<void> => {
  const messages = await db
    .select()
    .from(guestMessagesTable)
    .orderBy(desc(guestMessagesTable.createdAt));
  res.json(ListMessagesResponse.parse(messages));
});

router.post("/messages", async (req, res): Promise<void> => {
  const parsed = CreateMessageBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.message }, "Invalid message body");
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [message] = await db
    .insert(guestMessagesTable)
    .values(parsed.data)
    .returning();
  res.status(201).json(message);
});

export default router;
