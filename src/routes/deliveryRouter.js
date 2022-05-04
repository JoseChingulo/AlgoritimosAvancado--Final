const express = require("express");
const deliveryRouter = express.Router();
const deliveryController = require("../controllers/deliveryController");
const auth = require("../middlewares/auth");
const validation = require("../middlewares/validators/deliveryValidator")

deliveryRouter.post("/newDelivery", auth, validation, deliveryController.newDelivery);
deliveryRouter.delete("/deleteDelivery", auth, deliveryController.deleteDelivery);
deliveryRouter.get("/listAllDeliveries",  auth, deliveryController.listAllDeliveries);
deliveryRouter.put("/updateDelivery", auth, deliveryController.updateDelivery);
deliveryRouter.get("/listAllDelivered", auth, deliveryController.listAllDelivered);
deliveryRouter.get("/listAllPending", auth, deliveryController.listAllPending);
deliveryRouter.get("/listAllByDeliveryman", auth, deliveryController.listAllByDeliveryman);
deliveryRouter.get("/listAllDeliveredByDeliveryman", auth, deliveryController.listAllDeliveredByDeliveryman);
deliveryRouter.get("/listAllPendingByDeliveryman", auth, deliveryController.listAllPendingByDeliveryman);
deliveryRouter.put("/endDelivery", auth, deliveryController.endDelivery);
deliveryRouter.get("/listAllDeliveredByAssociate", auth, deliveryController.listAllDeliveredByAssociate);
deliveryRouter.get("/listAllPendingByAssociate", auth, deliveryController.listAllPendingByAssociate);

module.exports = deliveryRouter;