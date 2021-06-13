//Validation
const Joi = require('@hapi/joi');

//Register Validation
const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).max(1024).required()
    });

    return schema.validate(data);  
}

//login Validation
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).max(1024).required()
    });
    
    return schema.validate(data);  
}

//recommendation Validation
const recommendationValidation = (data) => {
    const schema = Joi.object({
        link: Joi.string().required().uri(),
        description: Joi.string().min(6).required(),
        category: Joi.string().min(6).required().default("all"),
        data: Joi.date().default(Date.now),
        likes: Joi.number().default(0)
    });
    
    return schema.validate(data);  
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.recommendationValidation = recommendationValidation;