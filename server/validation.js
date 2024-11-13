const Joi = require('joi');

const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().min(6).max(50).required().email(),
    password: Joi.string().min(6).max(255).required(),
  });
  
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(50).required().email(),
    password: Joi.string().min(6).max(255).required(),
  });
  
  return schema.validate(data);
};

const cartValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(6).max(50).required(),
    url: Joi.string().min(6).max(50).required(),
    description: Joi.string().min(6).max(50).required(), 
    price: Joi.number().min(33).max(9999).required(),
    totalPrice: Joi.number().min(33).max(9999).required(), // 查詢圖片網站價格
  });
  
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation    = loginValidation;
module.exports.cartValidation     = cartValidation;