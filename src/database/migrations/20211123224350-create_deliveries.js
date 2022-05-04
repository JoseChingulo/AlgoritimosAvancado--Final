'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Deliveries", {
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
      deliveryManId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "DeliveryMans", key: "id" },
        onUpdate: "RESTRICT",
        onDelete: "CASCADE",
      },
      clientId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Clients", key: "id" },
        onUpdate: "RESTRICT",
        onDelete: "CASCADE",
      },
      description:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      delivered: {
         type: Sequelize.BOOLEAN,
         allowNull: false,
         defaultValue: false
      },     
      value: {
        type: Sequelize.FLOAT,
        allowNull: false,
      }, 
      deliveredAt: {
        type: Sequelize.DATE,
        allowNull: true,
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
    await queryInterface.dropTable("Deliveries");
  }
};
