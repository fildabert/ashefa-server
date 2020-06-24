/* eslint-disable linebreak-style */
/* eslint-disable no-useless-escape */
/* eslint-disable func-names */
const mongoose = require('mongoose');
const encrypt = require('../helpers/encrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'username cannot be empty'],
    unique: true,
  },
  firstName: {
    type: String,
    required: [true, 'firstName cannot be empty'],
  },
  lastName: {
    type: String,
    required: [true, 'lastName is required'],
  },
  email: {
    type: String,
    required: [true, 'email cannot be empty'],
    unique: [true, 'email is already taken'],
  },
  password: {
    type: String,
    required: [true, 'password cannot be empty'],
  },
  userType: {
    type: String,
    enum: ['Counselor', 'Client', 'Admin'],
    required: [true, 'userType cannot be empty'],
  },
  picture: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

userSchema.pre('save', function (next) {
  if (this.isNew) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(this.email)) {
      this.password = encrypt(this.password);
      this.picture = `https://ui-avatars.com/api/?name=${this.firstName}+${this.lastName}&size=150`;
      next();
    } else {
      throw Object.assign(new Error('Invalid email input'), { code: 400 });
    }
  } else {
    next();
  }
});

module.exports = mongoose.model('User', userSchema);
