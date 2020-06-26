/* eslint-disable no-async-promise-executor */
/* eslint-disable linebreak-style */
const Location = require('../models/location');

module.exports = {
  addLocation: ({ name, picture }) => new Promise(async (resolve, reject) => {
    try {
      const newLocation = new Location({ name, picture });

      const result = await newLocation.save();

      resolve(result);
    } catch (error) {
      reject(error);
    }
  }),

  findAllLocation: () => new Promise(async (resolve, reject) => {
    try {
      const locations = await Location.find();
      resolve(locations);
    } catch (error) {
      reject(error);
    }
  }),
};
