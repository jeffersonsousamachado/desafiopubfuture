const Sequelize = require("sequelize");
const db = require("../database");

const Despesa = db.define("tb_despesas", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  valor: { type: Sequelize.FLOAT, default: 0 },
  data_pagamento: { type: Sequelize.DATE, default: new Date() },
  data_pagamento_esperado: { type: Sequelize.DATE, default: new Date() },
  data_inicial: { type: Sequelize.DATE, default: new Date() },
  data_final: { type: Sequelize.DATE, default: new Date() },
  conta: { type: Sequelize.STRING },
  tipo_despesas: { type: Sequelize.STRING },
});

module.exports = Despesa;
