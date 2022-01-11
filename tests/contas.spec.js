const server = require("../server");
const requests = require("supertest");

describe("RContas", () => {
  it("buscarcontas", async () => {
    const response = await requests(server).get("/contas");
    expect(response.statusCode).toEqual(200);
  });
});
