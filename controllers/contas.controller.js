const db = require("../database/index");

const ContasModel = require("../models/contas.model");

module.exports = class ReceitaController {
  constructor() {}

  async getContas() {
    await db.sync();
    const response = await ContasModel.findAll();
    return Promise.resolve(response);
  }

  async novaConta(payload) {
    await db.sync();
    const response = await ContasModel.create(payload);
    return Promise.resolve(response);
  }
};
