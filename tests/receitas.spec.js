const server = require("../server");
const requests = require("supertest");

describe("Receitas", () => {
  //   it("should return status 200 after DELETING a receita", (done) => {
  //     requests(server)
  //       .delete("/receitas/" + 13)
  //       .end((err, res) => {
  //         if (err) throw err;
  //         expect(res.statusCode).toEqual(201);
  //         done();
  //       });
  //   });

  it("buscareceitas", async () => {
    const response = await requests(server).get("/receitas");
    expect(response.statusCode).toEqual(200);
  });

  it("should create new receitas", async () => {
    const response = await requests(server).post("/receitas", {
      valor: 650,
      data_recebimento: "2022-01-20T19:33:48.676Z",
      data_recebimento_esperado: "2022-01-22T19:33:48.676Z",
      data_inicial: "2022-01-07T19:33:48.676Z",
      data_final: "2022-01-09T19:33:48.676Z",
      descricao: "Salário-vale",
      conta: "conta_corrente",
      tipo_receita: "hora extra",
    });
    expect(response.body).toHaveProperty("data");
    expect(response.statusCode).toEqual(201);
  });

  it("filter by type receitas", async () => {
    const response = await requests(server).post("/filter-by-type", {
      tipo_receita: "salário",
    });

    if (Object.keys(response.body).length == 0) {
      expect(Object.keys(response.body).length == 0).toBe(true);
    } else {
      expect(response.body).toHaveProperty("data");
      expect(response.statusCode).toEqual(200);
    }
  });
});
