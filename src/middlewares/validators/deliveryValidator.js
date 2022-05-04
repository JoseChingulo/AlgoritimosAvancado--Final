const {
    newValidation,
    updateValidation,
    deleteValidation,
    endValidation
} = require("../../schemas/deliverySchema");

function validade(req, res, next) {

    switch (req.route.path){
        case '/listAllClients':
            return next();

        case '/newDelivery':
            const newBody = newValidation.validate(req.body);
            if (newBody.error){
                return res.status(422).json(newBody.error.details);
            } else if (newBody.value) {
                return next();
            } else {
                return res.status(500);
            }

        case '/updateDelivery':
            const updateDelivery = updateValidation.validate(req.body);
            if (updateDelivery.error){
                return res.status(422).json(updateDelivery.error.details);
            } else if (updateDelivery.value) {
                return next();
            } else {
                return res.status(500);
            }
        
        case '/deleteDelivery':
            const deleteDelivery = deleteValidation.validate(req.body);
            if (deleteDelivery.error){
                return res.status(422).json(deleteDelivery.error.details);
            } else if (deleteDelivery.value) {
                return next();
            } else {
                return res.status(500);
            }

        case '/listAllDelivered':
            return next();

        case '/listAllPending':
            return next();

        case '/listAllByDeliveryman':
            const listAllByDeliveryman = deleteValidation.validate(req.body);
            if (listAllByDeliveryman.error){
                return res.status(422).json(listAllByDeliveryman.error.details);
            } else if (listAllByDeliveryman.value) {
                return next();
            } else {
                return res.status(500);
            }

        case '/listAllDeliveredByDeliveryman':
            const listAllDeliveredByDeliveryman = deleteValidation.validate(req.body);
            if (listAllDeliveredByDeliveryman.error){
                return res.status(422).json(listAllDeliveredByDeliveryman.error.details);
            } else if (listAllDeliveredByDeliveryman.value) {
                return next();
            } else {
                return res.status(500);
            }

        case '/listAllPendingByDeliveryman':
            const listAllPendingByDeliveryman = deleteValidation.validate(req.body);
            if (listAllPendingByDeliveryman.error){
                return res.status(422).json(listAllPendingByDeliveryman.error.details);
            } else if (listAllPendingByDeliveryman.value) {
                return next();
            } else {
                return res.status(500);
            }

        case '/endDelivery':
            const endDelivery = endValidation.validate(req.body);
            if (endDelivery.error){
                return res.status(422).json(endDelivery.error.details);
            } else if (endDelivery.value) {
                return next();
            } else {
                return res.status(500);
            }

        default:
            return next();
    }
    
    //next();    
}

module.exports = validade;