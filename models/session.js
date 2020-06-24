/* eslint-disable linebreak-style */
/* eslint-disable no-useless-escape */
/* eslint-disable func-names */
const mongoose = require('mongoose');
const encrypt = require('../helpers/encrypt');

const { ObjectId } = mongoose.Schema.Types;

const sessionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'session name cannot be empty'],
  },
  counselors: [{ type: ObjectId, ref: 'User' }],
  clients: [{ type: ObjectId, ref: 'User' }],
  completed: {
    type: String,
    required: [true, 'completed cannot be empty'],
    default: false,
  },
  time: {
    type: Date,
    required: [true, 'time cannot be empty'],
  },
  type: {
    type: String,
    required: [true, 'type is required'],
    enum: ['Cleaning Activity', 'Psychodeducation', 'Sports Activity', 'Others', 'Morning Briefing',],
  },
  report: {
    type: String,
  },
  pictures: [{ type: String }],
  active: {
    type: Boolean,
    default: true,
  },
  location: {
    type: String,
    enum: ['Margasatwa'],
  },

}, { timestamps: true });

module.exports = mongoose.model('Session', sessionSchema);
