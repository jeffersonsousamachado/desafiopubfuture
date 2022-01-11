const Sequelize = require("sequelize");
const db = require("../database");
const Conta = require('./contas.model');

const Receita = db.define('tb_receitas', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  valor: {type: Sequelize.FLOAT, default:0},
  data_recebimento: { type: Sequelize.DATE, default: new Date() },
  data_recebimento_esperado: { type: Sequelize.DATE, default: new Date() },
  data_inicial: { type: Sequelize.DATE, default: new Date() },
  data_final: { type: Sequelize.DATE, default: new Date() },
  descricao: { type: Sequelize.STRING },
  conta: { type: Sequelize.STRING },
  tipo_receita: { type: Sequelize.STRING },
});

Receita.hasOne(Conta, {foreignKey: 'id'});
module.exports = Receita;
