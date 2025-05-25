const bcrypt = require('bcryptjs/dist/bcrypt');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String, 
    required: true,
  },
  email: {
    type: String, 
    required: [true, 'Email is required'], 
    unique: true,
    lowercase: true, 
    match: [/.+\@.+\..+/, 'Please fill a valid email address'], 
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long'],
  },
  phone: {
    type: String, 
    required: [true, 'Phone is required'],  
    minlength: [10, 'Phone must be at least 10 characters long'],
  },  
  avatar: {
    type: String,
  },
  location: {
    city: String,
    country: String,
    address: String,
    zipCode: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  // Lịch sử địa chỉ truy cập
  accessLocations: [{
    city: String,
    country: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    },
    ipAddress: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  role: {
    type: String,
    enum: ['admin', 'user', 'staff', 'manager'],
    default: 'user',
  },
  is_active: {
    type: Boolean,
    default: false, 
  }
}, {timestamps: true});


userSchema.pre('save', async function (next){
  if(!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;

