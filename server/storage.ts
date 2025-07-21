import { users, symptomChecks, type User, type InsertUser, type SymptomCheck, type InsertSymptomCheck } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  saveSymptomCheck(check: InsertSymptomCheck): Promise<SymptomCheck>;
  getSymptomCheckHistory(sessionId?: string, userId?: number, limit?: number): Promise<SymptomCheck[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async saveSymptomCheck(insertSymptomCheck: InsertSymptomCheck): Promise<SymptomCheck> {
    const [symptomCheck] = await db
      .insert(symptomChecks)
      .values(insertSymptomCheck)
      .returning();
    return symptomCheck;
  }

  async getSymptomCheckHistory(sessionId?: string, userId?: number, limit: number = 3): Promise<SymptomCheck[]> {
    if (userId) {
      return await db.select()
        .from(symptomChecks)
        .where(eq(symptomChecks.userId, userId))
        .orderBy(desc(symptomChecks.timestamp))
        .limit(limit);
    } else if (sessionId) {
      return await db.select()
        .from(symptomChecks)
        .where(eq(symptomChecks.sessionId, sessionId))
        .orderBy(desc(symptomChecks.timestamp))
        .limit(limit);
    } else {
      return [];
    }
  }
}

export const storage = new DatabaseStorage();