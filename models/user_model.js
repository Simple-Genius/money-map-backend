const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: [true, 'Please tell us your name'] },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false, // never show in any output
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on save or create
      validator: function (value) {
        return value === this.password;
      },
      message: 'Passwords should be the same',
    },
  },
  passwordChangedAt: Date,
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Pre-save middleware: runs between getting the data and saving it to the database
userSchema.pre('save', async function (next) {
  // 'this' keyword -> current model instance
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12); // salt is related to cpu intensity of hashing

  // delete password confirm
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000, // from ms to s
      10, // base 10 number
    );

    console.log('---', JWTTimestamp, changedTimeStamp);
    console.log('-++-', JWTTimestamp < changedTimeStamp);

    return JWTTimestamp < changedTimeStamp;
  }

  return false;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
