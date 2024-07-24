const request = require("supertest");
const app = require("../index"); // Adjust path if necessary

describe("GET /api/codeblocks/:id", () => {
  it("should return code block data", async () => {
    const response = await request(app).get("/api/codeblocks/1");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("code");
    expect(response.body).toHaveProperty("name");
  });
});
