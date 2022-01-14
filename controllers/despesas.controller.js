const db = require("../database/index");
const { Op } = require("sequelize");
const DespesasModel = require("../models/despesas.model");
const ReceitaModel = require("../models/receitas.model");
const ContasModel = require("../models/contas.model");

module.exports = class ReceitaController {
  constructor() {}

  async getDespesas() {
    await db.sync();
    const response = await DespesasModel.findAll();
    return Promise.resolve(response);
  }

  async filterByDate({ data_inicial, data_final }) {
    await db.sync();
    const response = await DespesasModel.findAll({
      where: { createdAt: { [Op.between]: [data_inicial, data_final] } },
    });
    return Promise.resolve(response);
  }

  async filterByType({ tipo_despesas }) {
    await db.sync();
    const response = await DespesasModel.findAll({ where: { tipo_despesas } });
    return Promise.resolve(response);
  }

  async novaDespesa(payload) {
    await db.sync();

    const contas = await ContasModel.findAll({ where: { id: payload.conta } });
    let saldoContas = 0;
    if (contas && contas.length > 0) {
      saldoContas = contas
        .map((conta) => parseFloat(conta.saldo || 0))
        .reduce((p, c) => p + c);
    }

    const saldoTotal = Math.abs(saldoContas - payload.valor);

    await ContasModel.update(
      { saldo: saldoTotal },
      { where: { id: payload.conta } }
    );
    const response = await DespesasModel.create(payload);
    return Promise.resolve(response);
  }

  async removerDespesa(id) {
    await db.sync();
    const response = await DespesasModel.findOne({ where: { id } });
    return Promise.resolve(response.destroy());
  }

  async atualizarDespesas(payload) {
    await db.sync();
    const contas = await ContasModel.findAll({ where: { id: payload.conta } });
    const saldoContas = contas
      .map((conta) => parseFloat(conta.saldo || 0))
      .reduce((p, c) => p + c);
    const saldoTotal = Math.abs(saldoContas - payload.valor);

    await ContasModel.update(
      { saldo: saldoTotal },
      { where: { id: payload.conta } }
    );

    const response = await DespesasModel.update(payload, {
      where: { id: payload.id },
    });
    return Promise.resolve(response);
  }

  async despesasTotal() {
    await db.sync();
    const response = await DespesasModel.findAll();
    let despesasTotal = 0;

    if (response && response.length > 0) {
      despesasTotal = response
        .map((despesa) => parseFloat(despesa.valor || 0))
        .reduce((p, c) => p + c);
    }

    return Promise.resolve(despesasTotal);
  }
};
