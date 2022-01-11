"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable("tb_despesas", {
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
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("tb_despesas");
  },
};
