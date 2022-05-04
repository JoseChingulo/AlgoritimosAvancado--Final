const Joi = require("joi");

const newValidation = Joi.object().keys({
    companyName: Joi.string()
    .required(),

    cnpj: Joi.string()
    .min(14)
    .max(14)
    .required(),

    password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
    .required(),

    address: Joi.string()
});

const updateValidation = Joi.object().keys({
    id: Joi.number()
    .integer()
    .required(),

    companyName: Joi.string(),
    
    cnpj: Joi.string()
    .min(14)
    .max(14),
    
    password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/),

    address: Joi.string()
});

const deleteValidation = Joi.object().keys({
    id: Joi.number()
    .integer()
    .required(),
});

const listByCnpjValidation = Joi.object().keys({
    cnpj: Joi.string()
    .min(14)
    .max(14)
    .required(),
});

const authValidation = Joi.object().keys({
    cnpj: Joi.string()
    .min(14)
    .max(14)
    .required(),

    password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/),
});

module.exports.newValidation = newValidation;
module.exports.updateValidation = updateValidation;
module.exports.deleteValidation = deleteValidation;
module.exports.listByCnpjValidation = listByCnpjValidation;
module.exports.authValidation = authValidation;