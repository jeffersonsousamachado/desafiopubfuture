const server = require("../server");
const requests = require("supertest");

describe("Despesas", () => {
  it("buscardespesas", async () => {
    const response = await requests(server).get("/despesas");
    expect(response.statusCode).toEqual(200);
  });
});
