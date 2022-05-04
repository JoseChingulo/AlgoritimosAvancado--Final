const { 
    newValidation, 
    updateValidation,
    deleteValidation,
    searchByIdValidation,
    searchByCpfValidation,
    searchByAssociateValidation,
    authValidation } = require("../../schemas/deliveryManSchema");
 
function validade(req, res, next) {
    var isAssociate = undefined;
    switch (req.route.path){
        
        case '/listAllDeliveryMen':
            return next();

        case '/newDeliveryMan':
            isAssociate = req.isAssociate;
            if (!isAssociate){
                return res.status(405).json({ msg: "Não Autorizado" });
            }

            const newBody = newValidation.validate(req.body);
            if (newBody.error){
                return res.status(422).json(newBody.error.details);
            } else if (newBody.value) {
                return next();
            }

        case '/updateDeliveryMan':
            isAssociate = req.isAssociate;
            if (!isAssociate){
                return res.status(405).json({ msg: "Não Autorizado" });
            }

            const updateBody = updateValidation.validate(req.body);
            if (updateBody.error){
                return res.status(422).json(updateBody.error.details);
            } else if (updateBody.value) {
                return next();
            }

        case '/deleteDeliveryman':
            isAssociate = req.isAssociate;
            if (!isAssociate){
                return res.status(405).json({ msg: "Não Autorizado" });
            }

            const deleteBody = deleteValidation.validate(req.query);
            if (deleteBody.error){
               return res.status(422).json(deleteBody.error.details);
            } else if (deleteBody.value) {
                return next();
            }

        case '/searchDeliveryManById':
            isAssociate = req.isAssociate;
            if (!isAssociate){
                return res.status(405).json({ msg: "Não Autorizado" });
            }

            const searchById = searchByIdValidation.validate(req.query);
            if (searchById.error){
                return res.status(422).json(searchById.error.details);
            } else if (searchById.value) {
                return next();
            }

        case '/searchDeliveryManByCpf':
            isAssociate = req.isAssociate;
            if (!isAssociate){
                return res.status(405).json({ msg: "Não Autorizado" });
            }

            const searchByCpf = searchByCpfValidation.validate(req.query);
            if (searchByCpf.error){
                return res.status(422).json(searchByCpf.error.details);
            } else if (searchByCpf.value) {
                return next();
            }

        case '/searchDeliveryMenByAssociate':
            isAssociate = req.isAssociate;
            if (!isAssociate){
                return res.status(405).json({ msg: "Não Autorizado" });
            }

            searchByAssociate = searchByAssociateValidation.validate(req.query);
            if (searchByAssociate.error){
                return res.status(422).json(searchByAssociate.error.details);
            } else if (searchByAssociate.value) {
                return next();
            }

        case '/authentication':
            const auth = authValidation.validate(req.body);
            if (auth.error){
                return res.status(422).json(auth.error.details);
            } else if (auth.value) {
                return next();
            } else {
                return res.status(500);
            }
        
        default:
            return next();
    }
}

module.exports = validade;