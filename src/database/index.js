const Sequelize = require("sequelize");
const dbconfig = require("./config/dbconfig");

const Associate = require("../models/Associate");
const Client = require("../models/Client");
const Delivery = require("../models/Delivery");
const DeliveryMen = require("../models/DeliveryMan");


const connection = new Sequelize(dbconfig);

//Inicianlizando os models:
Associate.init(connection);
Client.init(connection);
Delivery.init(connection);
DeliveryMen.init(connection);

//Definindo os relacionamentos entre os models:
Associate.associate(connection.models);
Client.associate(connection.models);
Delivery.associate(connection.models);
DeliveryMen.associate(connection.models);

console.log("Models started!");

module.exports = connection;