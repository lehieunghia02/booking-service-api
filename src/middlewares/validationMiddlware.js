const Joi = require('joi');

const validate = (schema) => (req, res, next) => {
  console.log(req.body);
  
  const { error } = schema.validate(req.body, { abortEarly: false });
  
  if (error) {
    const errors = error.details.map(detail => ({
      field: detail.path[0],
      message: detail.message
    }));
    
    return res.status(400).json({
      status: 400,
      message: 'Validation error',
      errors
    });
  }
  
  next();
};

module.exports = validate;