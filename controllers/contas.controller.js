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

  async removerConta(id) {
    await db.sync();
    const response = await ContasModel.findOne({ where: { id } });
    return Promise.resolve(response.destroy());
  }

  async atualizarConta(payload) {
    await db.sync();
    const response = await ContasModel.update(payload, {
      where: { id: payload.id },
    });
    return Promise.resolve(response);
  }
  
  async transferenciaConta(idOrigem, idDestino, valor) {
    await db.sync();
    const responseOrigem = await ContasModel.findOne({ where: { id: idOrigem } });
    const responseDestino = await ContasModel.findOne({ where: { id: idDestino } });

    const novoSaldo = parseFloat(responseDestino.saldo) + parseFloat(valor);
    const menoSaldo = parseFloat(responseOrigem.saldo) - parseFloat(valor);
    
    await ContasModel.update({saldo: menoSaldo}, {where: {id: idOrigem}});
    await ContasModel.update({saldo: novoSaldo}, {where: {id: idDestino}});

    return Promise.resolve(true);
  }

  async saldoTotal() {
    await db.sync();
    const response = await ContasModel.findAll();
    const saldoTotal = response.map(conta => parseFloat(conta.saldo)).reduce((p, c) => p + c);
    return Promise.resolve(saldoTotal);
  }
};
