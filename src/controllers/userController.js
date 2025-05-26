const User = require('../models/User');
const userService = require('../services/userService');
const forgotPassword = async (req, res) => {

}
const getInfoUser = async (req, res) => {
  try{
   
    const user = await userService.getInforUser(req.user._id); 
    if(!user)
    {
      return res.status(400).json({
        status: '400',
        message: 'User not found'
      })
    }
    return res.status(200).json({
      status: '200', 
      message: 'Get info user successfully',
      data: {
        user: user
      }
    })
  }catch(error)
  {
    return res.status(500).json({
      status: '500',
      message: error.message || 'Get info user failed'
    })
  }
}
const addFavoriteBusiness = async (req, res) => {
  const { _id} = req.user; 
  const {businessId} = req.body; 
  try {
    const user = await userService.addFavoriteBusiness(_id, businessId);
  } catch (error) {
    return res.status(500).json({
      status: '500',
      message: error.message || 'Add favorite business failed'
    })
  }
}
const updateInfoUser = async (req, res) => {
  const { _id} = req.user; 
  const {first_name, last_name} = req.body; 
  try {
    const user = await userService.updateInfoUser(_id, {first_name, last_name});
    if(!user)
    {
      return res.status(400).json({
        status: '400',  
        message: 'User not found'
      })
    }
    return res.status(200).json({
      status: '200',
      message: 'Update user successfully',
      data: user
    })
  }catch(error)
  {
    return res.status(500).json({
      status: '500',
      message: error.message || 'Update user failed'
    })
  }
}
module.exports = {
  getInfoUser,
  forgotPassword, 
  updateInfoUser,
  addFavoriteBusiness
}

