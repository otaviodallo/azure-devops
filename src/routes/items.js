import { Router } from "express";
import {
  listItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} from "../store.js";

export const itemsRouter = Router();

itemsRouter.get("/", (_req, res) => {
  res.json({ data: listItems() });
});

itemsRouter.get("/:id", (req, res) => {
  const item = getItem(req.params.id);
  if (!item) {
    return res.status(404).json({ error: "Not found" });
  }
  res.json({ data: item });
});

itemsRouter.post("/", (req, res) => {
  try {
    const item = createItem(req.body ?? {});
    res.status(201).json({ data: item });
  } catch (e) {
    if (e.message?.startsWith("VALIDATION:")) {
      return res.status(400).json({ error: e.message.replace("VALIDATION: ", "") });
    }
    throw e;
  }
});

itemsRouter.put("/:id", (req, res) => {
  try {
    const updated = updateItem(req.params.id, req.body ?? {});
    if (!updated) {
      return res.status(404).json({ error: "Not found" });
    }
    res.json({ data: updated });
  } catch (e) {
    if (e.message?.startsWith("VALIDATION:")) {
      return res.status(400).json({ error: e.message.replace("VALIDATION: ", "") });
    }
    throw e;
  }
});

itemsRouter.delete("/:id", (req, res) => {
  const ok = deleteItem(req.params.id);
  if (!ok) {
    return res.status(404).json({ error: "Not found" });
  }
  res.status(204).send();
});
