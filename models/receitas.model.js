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
  valor: {type: Sequelize.FLOAT},
  data_recebimento: { type: Sequelize.DATE },
  data_recebimento_esperado: { type: Sequelize.DATE },
  data_inicial: { type: Sequelize.DATE },
  data_final: { type: Sequelize.DATE },
  descricao: { type: Sequelize.STRING },
  conta: { type: Sequelize.STRING },
  tipo_receita: { type: Sequelize.STRING },
});

Receita.hasOne(Conta, {foreignKey: 'id'});
module.exports = Receita;

// module.exports = class ReceitaModel {
//     constructor(conn) {
//         this.connection = conn;
//     }
//     buscarreceitas(callback) {
//         var query= 'select * from tb_receitas';
//         this.connection.query(query, callback)
//     }
//     novaReceita(payload, callback) {
// const query = `insert into tb_receitas(
//     valor,
//     data_recebimento,
//     data_recebimento_esperado,
//     data_inicial,
//     data_final,
//     descricao,
//     conta,
//     tipo_receita
// ) values (?, ?, ?, ?, ?, ?, ?, ?)`
// const values = [
//     payload.valor,
//     payload.data_recebimento,
//     payload.data_recebimento_esperado,
//     payload.data_inicial,
//     payload.data_final,
//     payload.descricao,
//     payload.conta,
//     payload.tipo_receita,
// ]
// this.connection.query(query, values, callback);
//     }
// }
