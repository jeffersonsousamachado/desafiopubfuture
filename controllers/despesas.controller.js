const db = require("../database/index");

const DespesasModel = require("../models/despesas.model");

module.exports = class ReceitaController {
  constructor() {}

  async getDespesas() {
    await db.sync();
    const response = await DespesasModel.findAll();
    return Promise.resolve(response);
  }

  async novaDespesa(payload) {
    await db.sync();
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
    const response = await DespesasModel.update(payload, {
      where: { id: payload.id },
    });
    return Promise.resolve(response);
  }
  async despesasTotal() {
    await db.sync();
    const response = await DespesasModel.findAll();
    const despesasTotal = response.map(despesa => parseFloat(despesa.valor)).reduce((p, c) => p + c);
    return Promise.resolve(despesasTotal);
  }
};



