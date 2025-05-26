const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Business = require("../models/Business");

class UserService {
  async createUser(userData){
    try{
      const user = await User.create(userData);
      return user;
    }catch(error){
      throw new Error('Failed to create user');
    }
  }
  async addFavoriteBusiness(user_id, business_id){
    try {
      const user = await User.findById(user_id);
      if(!user)
      {
        throw new Error('User not found');
      }
      const business = await Business.findById(business_id);
      if(!business)
      {
        throw new Error('Business not found');
      }
      user.favorites.businesses.push(business_id);
      await user.save();
      return user;
    }catch(error)
    {
      return error;
    }
  }
  async removeFavoriteBusiness(userId, businessId){
    try {
      const user = await User.findById(userId);
      if(!user)
      {
        throw new Error('User not found');
      }
      const business = await Business.findById(businessId);
      if(!business)
      {
        throw new Error('Business not found');
      }
    //element in array categories 
    const index = user.favorites.businesses.indexOf(businessId);
    if(index !== -1)
    {
      user.favorites.businesses.splice(index, 1);
    }
    await user.save();
    return user;
    }catch(error)
    {
      throw new Error('Failed to remove favorite business');
    }
  }
  async getInforUser(userId){
    try{
      const user = await User.findById(userId);
      const {password, ...userData} = user.toObject();
      return userData;
    }catch(error){
      throw new Error('Failed to get user');
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
