import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSymptomCheckSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Save symptom check
  app.post("/api/symptom-checks", async (req, res) => {
    try {
      const checkData = insertSymptomCheckSchema.parse(req.body);
      const savedCheck = await storage.saveSymptomCheck(checkData);
      res.json(savedCheck);
    } catch (error) {
      console.error("Error saving symptom check:", error);
      res.status(400).json({ error: "Invalid symptom check data" });
    }
  });

  // Get symptom check history
  app.get("/api/symptom-checks", async (req, res) => {
    try {
      const { sessionId, userId, limit } = req.query;
      const history = await storage.getSymptomCheckHistory(
        sessionId as string,
        userId ? parseInt(userId as string) : undefined,
        limit ? parseInt(limit as string) : 3
      );
      res.json(history);
    } catch (error) {
      console.error("Error getting symptom check history:", error);
      res.status(500).json({ error: "Failed to retrieve history" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
