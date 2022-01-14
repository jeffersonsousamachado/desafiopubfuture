const db = require("../database/index");
const ContasModel = require("../models/contas.model");

module.exports = class ReceitaController {
  constructor() {}

  //buscar contas (erro)
  async getContas() {
    await db.sync();
    const response = await ContasModel.findAll();
    return Promise.resolve(response);
  }

  // Cadastrar nova conta (ok)
  async novaConta(payload) {
    return new Promise(async (resolve, reject) => {
      try {
        // await db.sync();
        const response = await ContasModel.create(payload);
        resolve(response);
      } catch (e) {
        reject(e);
      }
    });
  }

  // Remover conta - precisa trocar por tipo_conta ( )
  async removerConta(id) {
    await db.sync();
    const response = await ContasModel.findOne({ where: { id } });
    return Promise.resolve(response.destroy());
  }

  // Editar conta, atualizando algum campo como tipo de conta, valor, etc.
  async atualizarConta(payload) {
    await db.sync();
    const response = await ContasModel.update(payload, {
      where: { id: payload.id },
    });
    return Promise.resolve(response);
  }

  // Transferencia entre contas - precisa arrumar bug
  // Deveria buscar valores da tabela receitas, encontrar tipo de conta e depois subtrair valores.
  async transferenciaConta(idOrigem, idDestino, valor) {
    await db.sync();
    const responseOrigem = await ContasModel.findOne({
      where: { id: idOrigem },
    });
    const responseDestino = await ContasModel.findOne({
      where: { id: idDestino },
    });

    const novoSaldo = parseFloat(responseDestino.saldo) + parseFloat(valor);
    const menoSaldo = parseFloat(responseOrigem.saldo) - parseFloat(valor);

    await ContasModel.update({ saldo: menoSaldo }, { where: { id: idOrigem } });
    await ContasModel.update(
      { saldo: novoSaldo },
      { where: { id: idDestino } }
    );

    return Promise.resolve(true);
  }

  // Saldo total da conta - precisa arrumar bug
  //receita total cadastrada soma 8300, mas no saldo total de contas aparece 1000 mil reais apenas :(
  async saldoTotal() {
    await db.sync();
    const response = await ContasModel.findAll();
    const saldoTotal = response
      .map((conta) => parseFloat(conta.saldo || 0))
      .reduce((p, c) => p + c);
    return Promise.resolve(saldoTotal);
  }
};
