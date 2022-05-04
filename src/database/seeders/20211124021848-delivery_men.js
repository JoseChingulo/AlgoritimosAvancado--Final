'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "DeliveryMans",
      [
        {
          associateId: 4,
          name: "Deliveryman José",
          cpf: "11111111111",
          password: "$2a$12$ImHG0RphH01UK80moIFnyO1J217waiaFoELKh0TldySCNjOpWM76G",
          phone: "(41) 99999-9999",
        },
        {
          associateId: 4,
          name: "Deliveryman Cardoso",
          cpf: "22222222222",
          password: "$2a$12$ImHG0RphH01UK80moIFnyO1J217waiaFoELKh0TldySCNjOpWM76G",
          phone: "(41) 99999-9999",
        },
        {
          associateId: 4,
          name: "Deliveryman Pedro ",
          cpf: "33333333333",
          password: "$2a$12$ImHG0RphH01UK80moIFnyO1J217waiaFoELKh0TldySCNjOpWM76G",
          phone: "(41) 99999-9999",
        },
        {
          associateId: 4,
          name: "Deliveryman Matheus",
          cpf: "44444444444",
          password: "$2a$12$ImHG0RphH01UK80moIFnyO1J217waiaFoELKh0TldySCNjOpWM76G",
          phone: "(41) 99999-9999",
        },
        {
          associateId: 4,
          name: "Deliveryman Eduardo",
          cpf: "55555555555",
          password: "$2a$12$ImHG0RphH01UK80moIFnyO1J217waiaFoELKh0TldySCNjOpWM76G",
          phone: "(41) 99999-9999",
        },
        {
          associateId: 4,
          name: "Deliveryman Paulo",
          cpf: "66666666666",
          password: "$2a$12$ImHG0RphH01UK80moIFnyO1J217waiaFoELKh0TldySCNjOpWM76G",
          phone: "(41) 99999-9999",
        },
        {
          associateId: 4,
          name: "Deliveryman Jorge",
          cpf: "77777777777",
          password: "$2a$12$ImHG0RphH01UK80moIFnyO1J217waiaFoELKh0TldySCNjOpWM76G",
          phone: "(41) 99999-9999",
        },
        {
          associateId: 4,
          name: "Deliveryman Emanuel",
          cpf: "88888888888",
          password: "$2a$12$ImHG0RphH01UK80moIFnyO1J217waiaFoELKh0TldySCNjOpWM76G",
          phone: "(41) 99999-9999",
        }
        
      ]
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("DeliveryMans", null, {});
  }
};
