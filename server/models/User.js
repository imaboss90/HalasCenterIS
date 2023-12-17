const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  fullName: String,
  username: String,
  password: String, 
  email: String,
  age: Number,
  lastCheckIn: Date,
  numberOfVisits: Number,
  studentID: String,
  qrCodeToken: String,
});

// Hash password before saving
userSchema.pre('save', async function(next) {

  const user = this;

  if(!user.isModified('password')) {
    return next();
  }

  const hash = await bcrypt.hash(user.password, 8);

  user.password = hash;
  next();
  
});
module.exports = mongoose.model('User', userSchema);

