/* eslint-disable linebreak-style */
const express = require('express');

const router = express.Router();

const locationControlller = require('../controllers/location-controller');

const createLocation = async (req, res, next) => {
  try {
    const { name, picture } = req.body;

    const result = await locationControlller.addLocation({ name, picture });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const findAllLocation = async (req, res, next) => {
  try {
    const result = await locationControlller.findAllLocation();

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

router.post('/', createLocation);
router.get('/all', findAllLocation);

module.exports = router;
