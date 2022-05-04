const Joi = require("joi");

const newValidation = Joi.object().keys({
    deliveryManId: Joi.number()
    .integer()
    .required(),
    
    clientId: Joi.number()
    .integer()
    .required(),
    
    description: Joi.string()
    .required()  
});

const updateValidation = Joi.object().keys({
    id: Joi.number()
    .integer()
    .required(),
       
    deliveryManId: Joi.number().integer(),
    
    clientId: Joi.number().integer(),
    
    description: Joi.string(),
});

const deleteValidation = Joi.object().keys({
    id: Joi.number()
    .integer()
    .required(),
});

const endValidation = Joi.object().keys({
    id: Joi.number()
    .integer()
    .required(),
    
    value: Joi.number().positive().precision(2).required(),   
});

module.exports.newValidation = newValidation;
module.exports.updateValidation = updateValidation;
module.exports.deleteValidation = deleteValidation;
module.exports.endValidation = endValidation;