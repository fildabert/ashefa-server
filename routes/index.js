/* eslint-disable linebreak-style */
const express = require('express');
const userRoute = require('./user-route');
const sessionRoute = require('./session-route');
const locationRoute = require('./location-route');

const router = express.Router();

router.use('/users', userRoute);
router.use('/locations', locationRoute);
router.use('/sessions', sessionRoute);

module.exports = router;
