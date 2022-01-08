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
};
