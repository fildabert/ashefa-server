/* eslint-disable no-underscore-dangle */
/* eslint-disable no-async-promise-executor */
/* eslint-disable linebreak-style */
const moment = require('moment');

const Session = require('../models/session');

module.exports = {
  createSession: ({
    name, counselors, clients, completed, type, report, pictures, time, location,
  }) => new Promise(async (resolve, reject) => {
    try {
      const session = new Session({
        name, counselors, clients, completed, type, report, pictures, time, location,
      });
      const savedSession = await session.save();
      resolve(savedSession);
    } catch (error) {
      reject(error);
    }
  }),
  editSession: ({
    _id, name, counselors, clients, completed, type, report, pictures, time,
  }) => new Promise(async (resolve, reject) => {
    try {
      const session = await Session.findOne({ _id });

      if (!session) {
        throw Object.assign(new Error('Session not found'), { code: 400 });
      }

      session.name = name || session.name;
      session.counselors = counselors || session.counselors;
      session.clients = clients || session.clients;
      session.completed = completed;
      session.type = type || session.type;
      session.report = report || session.report;
      session.pictures = pictures || session.pictures;
      session.time = time || session.time;

      if (session.isModified()) {
        session.__v += 1;
      }

      const result = await session.save();

      resolve(result);
    } catch (error) {
      reject(error);
    }
  }),
  getSessionsByDate: (date, location) => new Promise(async (resolve, reject) => {
    try {
      const sessions = await Session.find({ time: { $gte: moment(date).startOf('day'), $lte: moment(date).endOf('day') }, active: true, location }).populate('clients').populate('counselors');
      resolve(sessions);
    } catch (error) {
      reject(error);
    }
  }),
  getRecentActivities: (location) => new Promise(async (resolve, reject) => {
    try {
      const sessions = await Session.find({ active: true, location }).populate('clients').populate('counselors').sort({ updatedAt: 'desc' })
        .limit(8);
      resolve(sessions);
    } catch (error) {
      reject(error);
    }
  }),
  deleteSession: (_id) => new Promise(async (resolve, reject) => {
    try {
      const session = await Session.findOne({ _id });

      if (!session) {
        throw Object.assign(new Error('Session not found'), { code: 400 });
      }

      await session.remove();
      resolve({ success: true });
    } catch (error) {
      reject(error);
    }
  }),

};
