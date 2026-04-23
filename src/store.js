/** Armazenamento em memória para o CRUD (adequado a testes e demo). */

let idSeq = 1;
const items = new Map();

export function listItems() {
  return Array.from(items.values());
}

export function getItem(id) {
  return items.get(String(id)) ?? null;
}

export function createItem({ name, done = false }) {
  if (!name || typeof name !== "string" || !name.trim()) {
    throw new Error("VALIDATION: name is required");
  }
  const id = String(idSeq++);
  const record = { id, name: name.trim(), done: Boolean(done) };
  items.set(id, record);
  return record;
}

export function updateItem(id, patch) {
  const key = String(id);
  const current = items.get(key);
  if (!current) return null;
  const next = { ...current };
  if (patch.name !== undefined) {
    if (typeof patch.name !== "string" || !patch.name.trim()) {
      throw new Error("VALIDATION: name must be a non-empty string");
    }
    next.name = patch.name.trim();
  }
  if (patch.done !== undefined) {
    next.done = Boolean(patch.done);
  }
  items.set(key, next);
  return next;
}

export function deleteItem(id) {
  return items.delete(String(id));
}

export function resetStore() {
  idSeq = 1;
  items.clear();
}
