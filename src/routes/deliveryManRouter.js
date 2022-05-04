const express = require("express");
const deliveryManRouter = express.Router();
const deliveryManController = require("../controllers/deliveryManController");
const auth = require("../middlewares/auth");
const validation =  require("../middlewares/validators/deliveryMenValidator");

deliveryManRouter.get("/listAllDeliveryMen", auth, validation, deliveryManController.listAllDeliveryMen);
deliveryManRouter.get("/searchDeliveryManById", auth, validation, deliveryManController.searchDeliveryManById);
deliveryManRouter.get("/searchDeliveryManByCpf", auth,validation, deliveryManController.searchDeliveryManByCpf);
deliveryManRouter.get("/searchDeliveryMenByAssociate", validation, deliveryManController.searchDeliveryMenByAssociate);
deliveryManRouter.post("/newDeliveryMan", auth, validation, deliveryManController.newDeliveryMan);
deliveryManRouter.put("/updateDeliveryMan", auth, validation, deliveryManController.updateDeliveryMan);
deliveryManRouter.delete("/deleteDeliveryman", auth, validation, deliveryManController.deleteDeliveryman);
deliveryManRouter.post("/authentication", validation, deliveryManController.authentication);
deliveryManRouter.get("/financialReport", auth, deliveryManController.financialReport);
deliveryManRouter.get("/listAllDeliveryMenByAssociate", auth, deliveryManController.listAllDeliveryMenByAssociate);

module.exports = deliveryManRouter;