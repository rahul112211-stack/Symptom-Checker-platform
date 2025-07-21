import { pgTable, text, serial, integer, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const symptomChecks = pgTable("symptom_checks", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  selectedSymptoms: text("selected_symptoms").array().notNull(),
  matchingConditions: jsonb("matching_conditions").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  sessionId: text("session_id"),
});

export const usersRelations = relations(users, ({ many }) => ({
  symptomChecks: many(symptomChecks),
}));

export const symptomChecksRelations = relations(symptomChecks, ({ one }) => ({
  user: one(users, {
    fields: [symptomChecks.userId],
    references: [users.id],
  }),
}));

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertSymptomCheckSchema = createInsertSchema(symptomChecks).omit({
  id: true,
  timestamp: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type SymptomCheck = typeof symptomChecks.$inferSelect;
export type InsertSymptomCheck = z.infer<typeof insertSymptomCheckSchema>;