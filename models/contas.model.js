const Sequelize = require("sequelize");
const db = require("../database");

const Despesa = db.define('tb_contas', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  saldo: {type: Sequelize.DECIMAL, default: 0},
  instituicao_financeira: { type: Sequelize.STRING },
  tipo_conta: { type: Sequelize.STRING },
});

module.exports = Despesa;