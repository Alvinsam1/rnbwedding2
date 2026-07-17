import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const guestMessagesTable = pgTable("guest_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertGuestMessageSchema = createInsertSchema(guestMessagesTable).omit({ id: true, createdAt: true });
export type InsertGuestMessage = z.infer<typeof insertGuestMessageSchema>;
export type GuestMessage = typeof guestMessagesTable.$inferSelect;
