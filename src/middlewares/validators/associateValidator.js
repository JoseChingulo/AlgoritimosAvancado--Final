const {
    newValidation,
    updateValidation,
    deleteValidation,
    listByCnpjValidation,
    authValidation } = require("../../schemas/associateSchema");


function validade(req, res, next) {

    switch (req.route.path){
        case '/listAllAssociates':
            return next();
            
        case '/listAssociateByCnpj':
            const listByCnpj = listByCnpjValidation.validate(req.query);
            if (listByCnpj.error){
                return res.status(422).json(listByCnpj.error.details);
            } else if (listByCnpj.value) {
                return next();
            } else {
                return res.status(500);
            }

        case '/newAssociate':
            const newBody = newValidation.validate(req.body);
            if (newBody.error){
                return res.status(422).json(newBody.error.details);
            } else if (newBody.value) {
                return next();
            } else {
                return res.status(500);
            }

        case '/deleteAssociate':
            const deleteBody = deleteValidation.validate(req.query);
            if (deleteBody.error){
                return res.status(422).json(deleteBody.error.details);
            } else if (deleteBody.value) {
                return next();
            } else {
                return res.status(500);
            }

        case '/updateAssociate':
            const updateBody = updateValidation.validate(req.body);
            if (updateBody.error){
                return res.status(422).json(updateBody.error.details);
            } else if (updateBody.value) {
                return next();
            } else {
                return res.status(500);
            }

        //Routes for Associate
        case '/authentication':
            const authBody = authValidation.validate(req.body);
            if (authBody.error){
                return res.status(422).json(authBody.error.details);
            } else if (authBody.value) {
                return next();
            } else {
                return res.status(500);
            }

        case '/update':
            const update = updateValidation.validate(req.body);
            if (update.error){
                return res.status(422).json(update.error.details);
            } else if (update.value) {
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