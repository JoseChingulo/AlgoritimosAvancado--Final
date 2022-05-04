'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Clients", {
      id: {
         type: Sequelize.INTEGER,
         primaryKey: true,
         autoIncrement: true,
         allowNull: false,
      },
      associateId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Associates", key: "id" },
        onUpdate: "RESTRICT",
        onDelete: "CASCADE",
      },
      cnpj:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      companyName: {
         type: Sequelize.STRING,
         allowNull: false,
      }, 
      address: {
        type: Sequelize.STRING,
        allowNull: false,
     },     
      createdAt:{
       type:Sequelize.DATE,
       allowNull:false,
       defaultValue:Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt:{
        type:Sequelize.DATE,
        allowNull:false,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Clients");
  }
};
