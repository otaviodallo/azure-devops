import {
  listItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} from "../src/store.js";

describe("store", () => {
  it("cria e lista itens", () => {
    const a = createItem({ name: "Tarefa 1" });
    expect(a.id).toBe("1");
    expect(a.name).toBe("Tarefa 1");
    expect(a.done).toBe(false);
    expect(listItems()).toHaveLength(1);
  });

  it("rejeita nome vazio", () => {
    expect(() => createItem({ name: "" })).toThrow("VALIDATION: name is required");
    expect(() => createItem({})).toThrow("VALIDATION: name is required");
  });

  it("getItem retorna null se não existir", () => {
    expect(getItem("999")).toBeNull();
  });

  it("atualiza e remove", () => {
    const created = createItem({ name: "X" });
    const u = updateItem(created.id, { name: "Y", done: true });
    expect(u.name).toBe("Y");
    expect(u.done).toBe(true);
    expect(deleteItem(created.id)).toBe(true);
    expect(getItem(created.id)).toBeNull();
  });

  it("update em id inexistente retorna null", () => {
    expect(updateItem("nope", { name: "Z" })).toBeNull();
  });

  /** Falha proposital — remova ou corrija ao validar o pipeline. */
  it("falha proposital (demo pipeline)", () => {
    expect(true).toBe(false);
  });
});
