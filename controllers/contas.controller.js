const db = require("../database/index");
const ContasModel = require("../models/contas.model");
const DespesasModel = require("../models/despesas.model");
const ReceitaModel = require("../models/receitas.model");

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
  async removerConta({id_conta}) {
    await db.sync();
    const response = await ContasModel.findOne({ where: { id: id_conta } });
    response.destroy()
    await DespesasModel.destroy({ where: { conta: id_conta } });
    await ReceitaModel.destroy({ where: { conta: id_conta } });
    
    return Promise.resolve(true);
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
      .map((conta) =>conta.saldo)
      .reduce((p, c) => p + c);
    return Promise.resolve(saldoTotal);
  }
};
