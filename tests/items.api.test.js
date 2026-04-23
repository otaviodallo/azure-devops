import request from "supertest";
import { createApp } from "../src/app.js";

describe("API /api/items", () => {
  const app = createApp();

  it("GET /health", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });

  it("CRUD completo", async () => {
    const list0 = await request(app).get("/api/items");
    expect(list0.status).toBe(200);
    expect(list0.body.data).toEqual([]);

    const post = await request(app)
      .post("/api/items")
      .send({ name: "Item teste" });
    expect(post.status).toBe(201);
    expect(post.body.data).toMatchObject({ name: "Item teste", done: false });
    const id = post.body.data.id;

    const getOne = await request(app).get(`/api/items/${id}`);
    expect(getOne.status).toBe(200);
    expect(getOne.body.data.name).toBe("Item teste");

    const put = await request(app)
      .put(`/api/items/${id}`)
      .send({ name: "Atualizado", done: true });
    expect(put.status).toBe(200);
    expect(put.body.data).toMatchObject({ name: "Atualizado", done: true });

    const del = await request(app).delete(`/api/items/${id}`);
    expect(del.status).toBe(204);

    const get404 = await request(app).get(`/api/items/${id}`);
    expect(get404.status).toBe(404);
  });

  it("POST com body inválido retorna 400", async () => {
    const res = await request(app).post("/api/items").send({ name: "" });
    expect(res.status).toBe(400);
  });
});
