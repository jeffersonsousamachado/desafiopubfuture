const server = require("../server");
const requests = require("supertest");

describe("Index", () => {
  it("should server is alive", async () => {
    const response = await requests(server).get("/");
    expect(response.statusCode).toEqual(200);
  });
});
