const express = require("express");
const deliveryRouter = require("./deliveryRouter");
const deliveryManRouter = require("./deliveryManRouter");
const clientRouter = require("./clientRouter");
const associateRouter = require("./associateRouter");
const router = express.Router();

router.get('/', (req, res) => {
    res.send("It's working");
});

router.use("/delivery", deliveryRouter);    
router.use("/deliveryman", deliveryManRouter);
router.use("/client", clientRouter);
router.use("/associate", associateRouter);


module.exports = router;