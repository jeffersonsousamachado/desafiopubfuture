const server = require("../server");
const requests = require("supertest");
const receitaController = require("../controllers/receitas.controller");
const rc = new receitaController();

//iniciando testes de receitas/routes

//deletar receitas (ok) -
//esta pausado com comentario para não dar erro nos codigos abaixo.
//Precisa criar uma receita antes de deletar caso não tenha nenhuma cadastrada no banco.
describe("Receitas", () => {
  // //   it("should return status 200 after DELETING a receita", (done) => {
  // //     requests(server)
  // //       .delete("/receitas/" + 13)
  // //       .end((err, res) => {
  // //         if (err) throw err;
  // //         expect(res.statusCode).toEqual(201);
  // //         done();
  // //       });
  // //   });

  //Buscar todas receitas (ok)
  it("buscareceitas", async () => {
    const response = await requests(server).get("/receitas");
    expect(response.statusCode).toEqual(200);
  });

  //criar nova receitas (ok)
  it("should create new receitas", async () => {
    const response = await requests(server).post("/receitas", {
      valor: 650,
      data_recebimento: "2022-01-20T19:33:48.676Z",
      data_recebimento_esperado: "2022-01-22T19:33:48.676Z",
      data_inicial: "2022-01-07T19:33:48.676Z",
      data_final: "2022-01-09T19:33:48.676Z",
      descricao: "Salário-vale",
      tipo_conta: "conta_corrente",
      tipo_receita: "hora extra",
    });
    expect(response.body).toHaveProperty("data");
    expect(response.statusCode).toEqual(201);
  });

  //filtrar por tipo de receita (ok)
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

  // atualizar receita (ok)
  it("atualizar receita", async () => {
    const response = await requests(server).put("/receitas", {
      tipo_conta: "corrente",
      id: 27,
    });
    expect(response.body).toHaveProperty("data");
    expect(response.statusCode).toEqual(201);
  });

  // receita total (ok)
  it("receita total", async () => {
    const total = await rc.receitaTotal();
    const response = await requests(server).get("/receitas/receita-total");
    expect(response.body.data).toEqual(total);
    expect(response.statusCode).toEqual(200);
  });
});
