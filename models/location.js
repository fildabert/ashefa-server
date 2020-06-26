/* eslint-disable linebreak-style */
/* eslint-disable no-useless-escape */
/* eslint-disable func-names */
const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'session name cannot be empty'],
  },
  picture: {
    type: String,
    required: [true, 'picture url is required'],
  }

}, { timestamps: true });

module.exports = mongoose.model('Location', locationSchema);
