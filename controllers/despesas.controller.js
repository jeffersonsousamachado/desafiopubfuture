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
    const response = await DespesasModel.create(payload);
    await this.updateSaldo(payload.conta);
    return Promise.resolve(response);

    // const contas = await ContasModel.findAll({ where: { id: payload.conta } });
    // let saldoContas = 0;
    // if (contas && contas.length > 0) {
    //   saldoContas = contas
    //     .map((conta) => conta.saldo)
    //     .reduce((previous, current) => previous + current);
    // }

    // const receitas = await ReceitaModel.findAll({ where: { conta: payload.conta } });
    // const despesas = await DespesasModel.findAll({ where: { conta: payload.conta } });

    // let saldoDespesas = 0;
    // if (despesas && despesas.length > 0) {
    //   saldoDespesas = despesas
    //     .map((conta) => conta.valor)
    //     .reduce((previous, current) => previous + current);
    // }

    // let saldoReceita = 0;
    // if (receitas && receitas.length > 0) {
    //   saldoReceita = receitas
    //     .map((conta) => conta.valor)
    //     .reduce((previous, current) => previous + current);
    // }
    // const saldoTotal = (saldoReceita - saldoDespesas);

    // await ContasModel.update(
    //   { saldo: saldoTotal },
    //   { where: { id: payload.conta } }
    // );
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

  async removerDespesa({ id_despesas, id_conta }) {
    await db.sync();
    const response = await DespesasModel.findOne({
      where: { id: id_despesas },
    });
    response.destroy();
    await this.updateSaldo(id_conta);
    return Promise.resolve(true);
  }

  async atualizarDespesas(payload) {
    await db.sync();
    const response = await DespesasModel.update(payload, {
      where: { id: payload.id },
    });
    await this.updateSaldo(payload.conta);
    return Promise.resolve(response);

    // const receitas = await ReceitaModel.findAll({ where: { conta: payload.conta } });
    // const despesas = await DespesasModel.findAll({ where: { conta: payload.conta } });

    // let saldoDespesas = 0;
    // if (despesas && despesas.length > 0) {
    //   saldoDespesas = despesas
    //     .map((conta) => conta.valor)
    //     .reduce((previous, current) => previous + current);
    // }

    // let saldoReceita = 0;
    // if (receitas && receitas.length > 0) {
    //   saldoReceita = receitas
    //     .map((conta) => conta.valor)
    //     .reduce((previous, current) => previous + current);
    // }
    // const saldoTotal = (saldoReceita - saldoDespesas);

    // await ContasModel.update(
    //   { saldo: saldoTotal },
    //   { where: { id: payload.conta } }
    // );
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
