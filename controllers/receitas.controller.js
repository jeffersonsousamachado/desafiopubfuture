const db = require("../database/index");
const { Op } = require("sequelize");
const ReceitaModel = require("../models/receitas.model");
const ContasModel = require("../models/contas.model");

module.exports = class ReceitaController {
  constructor() {}

  async getReceitas() {
    await db.sync();
    const response = await ReceitaModel.findAll();
    return Promise.resolve(response);
  }

  async novaReceita(payload) {
    await db.sync();
    const saldo = await ContasModel.sum('saldo', { group: 'id' });
    const saldoTotal = saldo + payload.valor;

    await ContasModel.update(
      { saldo: saldoTotal },
      { where: { id: payload.conta } }
    );
    const response = await ReceitaModel.create(payload);

    return Promise.resolve(response);

  }

  async filterByDate({ data_inicial, data_final }) {
    await db.sync();
    const response = await ReceitaModel.findAll({
      where: { data_recebimento: { [Op.between]: [data_inicial, data_final] } },
    });
    return Promise.resolve(response);
  }
};
