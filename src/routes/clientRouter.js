const express = require("express");
const clientRouter = express.Router();
const clientController = require("../controllers/clientController");
const auth = require("../middlewares/auth");
const validation = require("../middlewares/validators/clientValidator");

clientRouter.get("/listAllClients",  validation, clientController.listAllClients);
clientRouter.get("/listClientByCnpj", auth, validation, clientController.searchClientByCnpj);
clientRouter.get("/listClientById", auth, validation, clientController.searchClientById);
clientRouter.delete("/deleteClient", auth, validation, clientController.deleteClient);
clientRouter.put("/updateClient", auth, validation, clientController.updateClient)
clientRouter.post("/newClient", auth, validation, clientController.newClient);
clientRouter.get("/listAllClientsByAssociate", auth, clientController.listAllClientsByAssociate);

module.exports = clientRouter;
