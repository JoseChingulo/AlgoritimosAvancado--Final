const express = require("express");
const associateRouter = express.Router();
const associateController = require("../controllers/associateController");
const auth = require("../middlewares/auth");
const validation = require("../middlewares/validators/associateValidator");

associateRouter.get("/listAllAssociates", validation, associateController.listAllAssociates);
associateRouter.post("/newAssociate", validation, associateController.newAssociate);
associateRouter.post("/authentication", validation, associateController.authentication);
associateRouter.get("/listAssociateByCnpj", validation, associateController.searchAssociateByCnpj);
associateRouter.delete("/deleteAssociate", validation, associateController.deleteAssociate);
associateRouter.put("/updateAssociate", validation, associateController.updateAssociate);
associateRouter.post("/authentication", associateController.authentication);
associateRouter.get("/admReport", auth, associateController.adminReport);
associateRouter.get("/financialReport", auth, associateController.financialReport);
associateRouter.get("/findAssociateById", auth, associateController.searchAssociateById);

module.exports = associateRouter;
