const Sequelize = require("sequelize");
const db = require("../database");

const Despesa = db.define('tb_despesas', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  valor: {type: Sequelize.DECIMAL},
  data_pagamento: { type: Sequelize.DATE },
  data_pagamento_esperado: { type: Sequelize.DATE },
  data_inicial: { type: Sequelize.DATE },
  data_final: { type: Sequelize.DATE },
  conta: { type: Sequelize.STRING },
  tipo_despesas: { type: Sequelize.STRING },
});

module.exports = Despesa;