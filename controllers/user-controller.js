/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */
/* eslint-disable no-async-promise-executor */

const bcrypt = require('bcryptjs');
const User = require('../models/user');

module.exports = {
  createUser: ({
    username, firstName, lastName, email, password, userType, picture,
  }) => new Promise(async (resolve, reject) => {
    try {
      const newUser = User({
        username, firstName, lastName, email, password, userType, picture,
      });
      const userCreated = await newUser.save();
      resolve(userCreated);
    } catch (error) {
      reject(error);
    }
  }),
  login: ({ username, password }) => new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        throw Object.assign(new Error('Invalid username/password'), { code: 400 });
      }
      const passwordCheck = await bcrypt.compare(password, user.password);
      if (!passwordCheck) {
        throw Object.assign(new Error('Invalid username/password'), { code: 400 });
      }

      delete user.password;
      resolve(user);
    } catch (error) {
      reject(error);
    }
  }),
  getUser: (_id) => new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ _id });
      if (!user) {
        throw Object.assign(new Error('User not found'), { code: 400 });
      }
      delete user.password;

      resolve(user);
    } catch (error) {
      reject(error);
    }
  }),
  getClients: () => new Promise(async (resolve, reject) => {
    // TODO: ONLY GET ACTIVE CLIENTS
    try {
      const activeClients = await User.find({ userType: 'Client' });

      activeClients.forEach((client) => {
        delete client.password;
      });
      resolve(activeClients);
    } catch (error) {
      reject(error);
    }
  }),
  getActiveCounselors: () => new Promise(async (resolve, reject) => {
    // TODO: ONLY GET ACTIVE CLIENTS
    try {
      const getActiveCounselors = await User.find({ userType: 'Counselor' });

      getActiveCounselors.forEach((counselor) => {
        delete counselor.password;
      });

      resolve(getActiveCounselors);
    } catch (error) {
      reject(error);
    }
  }),
  editPicture: ({ _id, pictureUrl }) => new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ _id });
      if (!user) {
        throw Object.assign(new Error('User not found'), { code: 400 });
      }

      user.picture = pictureUrl || user.picture;

      const result = await user.save();
      delete result.password;
      resolve(result);
    } catch (error) {
      reject(error);
    }
  }),
};
