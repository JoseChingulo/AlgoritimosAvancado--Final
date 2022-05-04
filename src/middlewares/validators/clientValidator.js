const {
    newValidation,
    updateValidation,
    deleteValidation,
    listByCnpjValidation,
    listByIdValidation
} = require("../../schemas/clientSchema");

function validade(req, res, next) {

    switch (req.route.path){
        case '/listAllClients':
            return next();

        case '/listClientByCnpj':
            const listByCnpj = listByCnpjValidation.validate(req.query);
            if (listByCnpj.error){
                return res.status(422).json(listByCnpj.error.details);
            } else if (listByCnpj.value) {
                return next();
            } else {
                return res.status(500);
            }

        case '/listClientById':
            const listById = listByIdValidation.validate(req.query);
            if (listById.error){
                return res.status(422).json(listById.error.details);
            } else if (listById.value) {
                return next();
            } else {
                return res.status(500);
            }

        case '/deleteClient':
            const deleteBody = deleteValidation.validate(req.query);
            if (deleteBody.error){
                return res.status(422).json(deleteBody.error.details);
            } else if (deleteBody.value) {
                return next();
            } else {
                return res.status(500);
            }

        case '/updateClient':
            const updateBody = updateValidation.validate(req.body);
            if (updateBody.error){
                return res.status(422).json(updateBody.error.details);
            } else if (updateBody.value) {
                return next();
            } else {
                return res.status(500);
            }

        case '/newClient':
            const newBody = newValidation.validate(req.body);
            if (newBody.error){
                return res.status(422).json(newBody.error.details);
            } else if (newBody.value) {
                return next();
            } else {
                return res.status(500);
            }

        default:
            return next();
    } 
}

module.exports = validade;