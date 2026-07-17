import { Router, type IRouter } from "express";
import { desc } from "drizzle-orm";
import { db, photosTable } from "@workspace/db";
import { CreatePhotoBody, ListPhotosResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/photos", async (_req, res): Promise<void> => {
  const photos = await db
    .select()
    .from(photosTable)
    .orderBy(desc(photosTable.createdAt));
  res.json(ListPhotosResponse.parse(photos));
});

router.post("/photos", async (req, res): Promise<void> => {
  const parsed = CreatePhotoBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.message }, "Invalid photo body");
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [photo] = await db.insert(photosTable).values(parsed.data).returning();
  res.status(201).json(photo);
});

export default router;
