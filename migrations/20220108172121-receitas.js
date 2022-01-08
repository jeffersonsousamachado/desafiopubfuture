"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("tb_receitas", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      valor: {
        type: Sequelize.DECIMAL,
      },

      data_recebimento: { type: Sequelize.DATE },
      data_recebimento_esperado: { type: Sequelize.DATE },
      data_inicial: { type: Sequelize.DATE },
      data_final: { type: Sequelize.DATE },
      descricao: { type: Sequelize.STRING },
      conta: { type: Sequelize.STRING },
      tipo_receita: { type: Sequelize.STRING },
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
