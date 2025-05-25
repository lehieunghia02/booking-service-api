const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class UserService {
  async createUser(userData){
    try{
      const user = await User.create(userData);
      return user;
    }catch(error){
      throw new Error('Failed to create user');
    }
  }
  async getUserById(userId){
    try
    {
      const user = await User.findById(userId); 
      if(!user)
      {
        throw new Error('User not found');
      }
      return user;
    }catch(error){
      throw new Error('Failed to get user');
    }
  }
  async updateUserById(userId, userData){
    try{
      const user = await User.findByIdAndUpdate(userId, userData, {new: true});
      if(!user)
      {
        throw new Error('User not found');
      }
      return user;
    }catch(error){
      throw new Error('Failed to update user');
    }
  }
  async login(email, password)
  {
    try{
      const user = await User.findOne({email}); 
      if(!user)
      {
        throw new Error('User not found');
      }
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        throw new Error("Invalid email or password");
      }
      if(!user.is_active)
      {
        throw new Error("Your account is disabled");
      }
      const token = this.generateToken(user._id);
      return  token
    }catch(error){
      throw new Error(error.message || "Login failed");
    }
  }
  
  generateToken(userId) {
    return jwt.sign(
      { id: userId }, 
      process.env.JWT_SECRET, 
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
  }
  async forgotPassword(email)
  {
    try{
      const user = await User.findOne({email});
      if(!user)
      {
        throw new Error('User not found');
      }
      const token = this.generateToken(user._id);
      const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
      const emailOptions = {
        to: user.email,
        subject: 'Reset Password',
        text: `Click the link below to reset your password: ${resetLink}`
      }
      await sendEmail(emailOptions);
      return { message: 'Password reset email sent' };
    }catch(error)
    {
      throw new Error('Failed to send password reset email');
    }
  }
  async updateInfoUser(userId, userData)
  {
    try 
    {
      const user = await User.findByIdAndUpdate(userId, userData, {new: true});
      if(!user)
      {
        throw new Error('User not found');
      }
      return user;
    }
    catch(error)
    {
      throw new Error('Failed to update user');
    }
  } 
}

module.exports = new UserService();
