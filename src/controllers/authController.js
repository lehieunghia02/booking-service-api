const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../middlewares/authMiddleware');


const register = async (req, res) => {
  try {
    const { first_name, last_name, email, password, confirm_password, phone } = req.body;
  
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: '400',
        message: 'User already exists',
      });
    }
  
    if (password !== confirm_password) {
      return res.status(400).json({
        status: '400',
        message: 'Password and confirm password do not match',
      });
    }
    

    const user = await User.create(req.body);
    
    const token = generateToken(user._id);
    
    res.status(201).json({
      status: '201',
      message: 'User created successfully',
      data: {
        user: {
          _id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          is_active: user.is_active
        },
        token
      }
    });
  }
  catch(error){
    return res.status(500).json({
      status: '500',
      message: error.message || 'Registration failed'
    });
  }
};

const login = async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({
        status: '400',
        message: 'User not found'
      });
    }
    const isMatch = await user.comparePassword(password);
    if(!isMatch){
      return res.status(400).json({
        status: '400',
        message: 'Invalid password'
      });
    }
    if(!user.is_active){
      return res.status(400).json({
        status: '400',
        message: 'Your account is disabled'
      })
    }
    const token = generateToken(user._id);
    res.status(200).json({
      status: '200',  
      message: "Login successfully",
      data: {   
        token 
      }
    });
  }catch(error){
    return res.status(500).json({
      status: '500',
      message: error.message || 'Login failed'
    });
  }
}

const logout = async (req, res) => {
  try {
    const {token} = req.body; 
    if(!token){
      return res.status(400).json({
        status: '400',
        message: 'Access token is required'
      })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if(!user){
      return res.status(400).json({
        status: '400',
        message: 'User not found'
      })
    }
  }catch(error){
    return res.status(500).json({
      status: '500',
      message: error.message || 'Logout failed'
    })
  }
}
const forgotPassword = async (req, res) => {
  try {
    
    const {email} = req.body; 
    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({
        status: '400',
        message: 'User not found'
      })
    }
  } catch (error) {
    return res.status(500).json({
      status: '500',
      message: error.message || 'Forgot password failed'
    })
  }
}

module.exports = {
  register,
  login,
  logout, 
  forgotPassword
} 


