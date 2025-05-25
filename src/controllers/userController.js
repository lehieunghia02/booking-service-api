const User = require('../models/user');
const userService = require('../services/userService');
const forgotPassword = async (req, res) => {

}
const getInfoUser = async (req, res) => {
  try{
   
    const user = await userService.getInfoUser(req.user._id); 
    if(!user)
    {
      return res.status(400).json({
        status: '400',
        message: 'User not found'
      })
    }
    const { password, ...userData } = user.toObject();
    return res.status(200).json({
      status: '200', 
      message: 'Get info user successfully',
      data: {
        user: userData
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
  updateInfoUser
}

