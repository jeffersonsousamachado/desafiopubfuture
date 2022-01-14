const server = require("../server");
const requests = require("supertest");
const contasController = require("../controllers/contas.controller");
const ct = new contasController();

// inicio dos testes de rotas

//Buscar contas (erro)
// tb_receitas foi cadastrada com coluna conta ao inves de tipo_conta, como fazemos alteração na tabela no banco de dados do sql.

describe("Contas", () => {
  it("buscarcontas", async () => {
    const response = await requests(server).get("/contas");
    expect(response.statusCode).toEqual(200);
  });

  //criar nova conta (ok)
  it("should create new conta", async () => {
    const response = await requests(server).post("/contas").send({
      saldo: 0,
      instituicao_financeira: "XPTO",
      tipo_conta: "Cofrinho",
    });
    expect(response.body).toHaveProperty("data");
    expect(response.statusCode).toEqual(201);
  });

  // transferencia entre contas (ERRO) - Como fazer para transferencia ocorrer na tabela de receitas e não na tabela de contas,
  // por que quando criamos uma conta o slado inicial é zero, sistema deveria somar valores cadastrados em tb_receitas em suas
  // respectivas contas para depois fazer a transferencia.
  // Outra dúvida, porque não é feito transferencia pelo tipo_conta ao inves do ID?
  // it("transferencia entre contas", async () => {
  //   const response = await requests(server).post("/contas/transferencia", {
  //     id_origem: 2,
  //     id_destino: 1,
  //     valor: 100,
  //   });
  //   expect(response.body).toHaveProperty("data");
  //   expect(response.statusCode).toEqual(201);
  // });

  //deletando contas ja cadastradas (ERRO)
  // it("should return status 200 after DELETING a conta", (done) => {
  //   requests(server)
  //     .delete("/conta/" + 8)
  //     .end((err, res) => {
  //       if (err) throw err;
  //       expect(res.statusCode).toEqual(201);
  //       done();
  //     });
  // });

  // atualizar conta (ERRO)
  // it("atualizar conta", async () => {
  //   const response = await requests(server).put("/conta", {
  //     instituicao_financeira: "Bradesco",
  //     tipo_conta: "corrente",
  //     id: 2,
  //   });
  //   expect(response.body).toHaveProperty("data");
  //   expect(response.statusCode).toEqual(201);
  // });

  //INICIANDO TESTES CONTROLADORES -------------------------------------------------------------------------------

  //Buscar todas contas (ok)
  // it("controladores buscar contas", async () => {
  //   const response = await ct.getContas();
  //   expect(response).not.toBeNull();
  // });

  //cadastrar contas ( )
  // it("controladores should create new conta", async () => {
  //   const response = await ct.novaConta({
  //     saldo: 0,
  //     instituicao_financeira: "XP",
  //     tipo_conta: "corretora de valores",
  //   });
  //   expect(response).not.toBeNull();
  // });

  //Remover contas ( )
  // it("controladores should deleting a conta", async () => {
  //   const response = await ct.removerConta(7);
  //   expect(response).not.toBeNull();
  // });

  // Saldo  total da conta (ERRO) saldo total na conta esta zerado porque quando cadastramos ele inicia com zero,
  //ainda não esta somando todas as receitas que cadastramos em TB_receitas
  // it("saldo total na conta", async () => {
  //   const total = await ct.saldoTotal();
  //   const response = await requests(server).get("/contas/saldo-total");
  //   expect(response.body.data).toEqual(total);
  //   expect(response.statusCode).toEqual(200);
  // });
});
