const Joi = require("joi");

const newValidation = Joi.object().keys({
    companyName: Joi.string()
    .required(),

    cnpj: Joi.string()
    .min(14)
    .max(14)
    .required(),

    address: Joi.string().required()
});

const updateValidation = Joi.object().keys({
    id: Joi.number()
    .integer()
    .required(),

    companyName: Joi.string(),
    
    cnpj: Joi.string()
    .min(14)
    .max(14),
    
    address: Joi.string()
});

const deleteValidation = Joi.object().keys({
    id: Joi.number()
    .integer()
    .required(),
});

const listByCnpjValidation = Joi.object().keys({
    cnpj: Joi.string()
    .min(18)
    .max(18)
    .pattern(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/)
    .required(),
});

const listByIdValidation = Joi.object().keys({
    id: Joi.number()
    .integer()
    .required(),
});


module.exports.newValidation = newValidation;
module.exports.updateValidation = updateValidation;
module.exports.deleteValidation = deleteValidation;
module.exports.listByCnpjValidation = listByCnpjValidation;
module.exports.listByIdValidation = listByIdValidation;