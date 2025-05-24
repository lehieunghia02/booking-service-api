const Joi = require('joi'); 

const registerSchema = Joi.object({
  first_name: Joi.string().required().messages({
    'string.empty': 'First name is required',
    'any.required': 'First name is required'
  }),
  last_name: Joi.string().required().messages({
    'string.empty': 'Last name is required',
    'any.required': 'Last name is required'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email',
    'string.empty': 'Email is required',
    'any.required': 'Email is required'
  }),
  password: Joi.string().min(8).required().messages({
    'string.min': 'Password must be at least 8 characters',
    'string.empty': 'Password is required',
    'any.required': 'Password is required'
  }),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Passwords do not match',
    'string.empty': 'Confirm password is required',
    'any.required': 'Confirm password is required'
  }),
  phone: Joi.string().min(10).required().messages({
    'string.min': 'Phone must be at least 10 characters',
    'string.empty': 'Phone is required',
    'any.required': 'Phone is required'
  })
});
const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email',
    'string.empty': 'Email is required',
    'any.required': 'Email is required'
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required',
    'any.required': 'Password is required'
  })
})
module.exports = {
  registerSchema,
  loginSchema 
}