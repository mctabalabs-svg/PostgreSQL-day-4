// tests/auth.test.js

const request = require("supertest");
const app = require("../src/app");

describe("GET /leads", () => {
  it("returns 401 when no token is provided", async () => {
    const res = await request(app).get("/leads");

    expect(res.statusCode).toBe(401);
  });
});

describe("Auth", () => {
  it("rejects signup with short password", async () => {
    const res = await request(app)
      .post("/auth/signup")
      .send({
        email: "t@t.com",
        password: "short",
      });

    expect(res.status).toBe(400);
  });

  it("signs up and logs in", async () => {
    const email = `test-${Date.now()}@t.com`;

    const signupRes = await request(app)
      .post("/auth/signup")
      .send({
        email,
        password: "longenough",
      });

    expect(signupRes.status).toBe(201);

    const loginRes = await request(app)
      .post("/auth/login")
      .send({
        email,
        password: "longenough",
      });

    expect(loginRes.status).toBe(200);

    expect(loginRes.body.token).toBeTruthy();
  });

  it("rejects wrong password", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({
        email: "never@t.com",
        password: "wrong",
      });

    expect(res.status).toBe(401);
  });
});