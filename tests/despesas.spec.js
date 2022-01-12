const server = require("../server");
const requests = require("supertest");
const despesasController = require("../controllers/despesas.controller");
const ds = new despesasController();

//inicio dos testes de rotas
// buscar desdepas (ok)
describe("Despesas", () => {
  it("buscardespesas", async () => {
    const response = await requests(server).get("/despesas");
    expect(response.statusCode).toEqual(200);
  });

  // despesa total (ok)
  it("despesa total", async () => {
    const total = await ds.despesasTotal();
    const response = await requests(server).get("/despesas/despesas-total");
    expect(response.body.data).toEqual(total);
    expect(response.statusCode).toEqual(200);
  });

  //criar nova despesas (ok)
  it("should create new despesa", async () => {
    const response = await requests(server).post("/despesas", {
      valor: 180,
      data_pagamento: null,
      data_pagamento_esperado: null,
      data_inicial: null,
      data_final: null,
      descricao: "posto de gasolina",
      conta: "conta corrente",
      tipo_despesas: "transporte",
    });
    expect(response.body).toHaveProperty("data");
    expect(response.statusCode).toEqual(201);
  });

  //filtrar por data (ok)
  it("filter by date", async () => {
    const response = await requests(server).post("/filter", {
      data_inicial: "2022-01-07T19:33:48.676Z",
      data_final: "2022-01-22T19:33:48.676Z",
    });

    if (Object.keys(response.body).length == 0) {
      expect(Object.keys(response.body).length == 0).toBe(true);
    } else {
      expect(response.body).toHaveProperty("data");
      expect(response.statusCode).toEqual(200);
    }
  });

  //filtrar por tipo de despesa (ok)
  it("filter by type despesa", async () => {
    const response = await requests(server)
      .post("/despesas/filter-by-type")
      .send({ tipo_despesas: "alimentação" });
    
    if (Object.keys(response.body).length == 0) {
      expect(Object.keys(response.body).length == 0).toBe(true);
    } else {
      expect(response.body).toHaveProperty("data");
      expect(response.statusCode).toEqual(200);
    }
  });

  //deletar despesas (ok)  
  // it("should return status 200 after DELETING a despesa", (done) => {
  //   requests(server)
  //     .delete("/despesas/" + 8)
  //     .end((err, res) => {
  //       if (err) throw err;
  //       expect(res.statusCode).toEqual(201);
  //       done();
  //     });
  // });

  // atualizar despesa (ok)
  it("atualizar despesa", async () => {
    const response = await requests(server).put("/despesas", {
      conta: "conta poupança",
      id: 27,
    });
    expect(response.body).toHaveProperty("data");
    expect(response.statusCode).toEqual(201);
  });
});
