const db = require("../database/index");
const { Op } = require("sequelize");
const ReceitaModel = require("../models/receitas.model");
const ContasModel = require("../models/contas.model");
const DespesasModel = require("../models/despesas.model");

module.exports = class ReceitaController {
  constructor() {}

  async getReceitas() {
    await db.sync();
    const response = await ReceitaModel.findAll();
    return Promise.resolve(response);
  }

  async novaReceita(payload) {
    await db.sync();
    const response = await ReceitaModel.create(payload);
    await this.updateSaldo(payload.conta);
    return Promise.resolve(response);
  }

  async filterByDate({ data_inicial, data_final }) {
    await db.sync();
    const response = await ReceitaModel.findAll({
      where: { data_recebimento: { [Op.between]: [data_inicial, data_final] } },
    });
    return Promise.resolve(response);
  }

  async filterByType({ tipo_receita }) {
    await db.sync();
    const response = await ReceitaModel.findAll({ where: { tipo_receita } });
    return Promise.resolve(response);
  }

  async removerReceita({id_receita, id_conta}) {
    await db.sync();
    const response = await ReceitaModel.findOne({ where: { id: id_receita } });
    response.destroy();
    await this.updateSaldo(id_conta);
    return Promise.resolve(true);
  }

  async atualizarReceita(payload) {
    await db.sync();
    const response = await ReceitaModel.update(payload, {
      where: { id: payload.id },
    });
    await this.updateSaldo(payload.conta);
    return Promise.resolve(response);
  }

  async receitaTotal() {
    await db.sync();
    const response = await ReceitaModel.findAll();
    let saldoTotal = 0;
    if (response && response.length > 0) {
      saldoTotal = response
        .map((receita) => parseFloat(receita.valor || 0))
        .reduce((p, c) => p + c);
    }
    return Promise.resolve(saldoTotal);
  }

  async updateSaldo(id_conta) {
    const receitas = await ReceitaModel.findAll({ where: { conta: id_conta } });
    const despesas = await DespesasModel.findAll({
      where: { conta: id_conta },
    });

    let saldoDespesas = 0;
    if (despesas && despesas.length > 0) {
      saldoDespesas = despesas
        .map((conta) => conta.valor)
        .reduce((previous, current) => previous + current);
    }

    let saldoReceita = 0;
    if (receitas && receitas.length > 0) {
      saldoReceita = receitas
        .map((conta) => conta.valor)
        .reduce((previous, current) => previous + current);
    }

    const saldoTotal = saldoReceita - saldoDespesas;

    await ContasModel.update(
      { saldo: saldoTotal },
      { where: { id: id_conta } }
    );
  }
};
