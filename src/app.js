import express from "express";
import { itemsRouter } from "./routes/items.js";

export function createApp() {
  const app = express();
  app.use(express.json());
  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });
  app.use("/api/items", itemsRouter);
  return app;
}
