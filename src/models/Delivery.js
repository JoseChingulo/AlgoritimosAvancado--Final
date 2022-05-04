const Sequelize = require("sequelize");

class Delivery extends Sequelize.Model {
    static init(sequelize) {
        super.init(
            {
                deliveredAt: Sequelize.DATE,
                value: Sequelize.FLOAT,
                description: Sequelize.STRING,
                delivered: Sequelize.BOOLEAN
            },
            {
                sequelize,
            }
        );
    }

    static associate(models){
        this.belongsTo(models.Client, { foreignKey: "clientId"})
        this.belongsTo(models.DeliveryMan, { foreignKey: "deliveryManId"})
        this.belongsTo(models.Associate, { foreignKey: "associateId" })
    }
}

module.exports = Delivery;