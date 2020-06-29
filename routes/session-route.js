/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */
const express = require('express');
const Multer = require('multer');

const multer = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  // dest: '../images'
});

const uploadImage = require('../helpers/aws');

const sessionController = require('../controllers/session-controller');

const router = express.Router();

const createSession = async (req, res, next) => {
  try {
    const {
      name, counselors, clients, completed, type, report, time, pictures = [], location,
    } = req.body;
    if (req.files) {
      const promises = [];

      req.files.forEach((file) => {
        promises.push(uploadImage(file, req.body));
      });

      const result = await Promise.all(promises);
      result.forEach((url) => {
        pictures.push(url);
      });
    }
    const result = await sessionController.createSession({
      clients, completed, counselors, location, name, pictures, report, time, type,
    });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getSessionsByDate = async (req, res, next) => {
  try {
    const { date, location } = req.params;
    const result = await sessionController.getSessionsByDate(date, location);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getRecentActivities = async (req, res, next) => {
  try {
    const result = await sessionController.getRecentActivities(req.params.location);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const editSession = async (req, res, next) => {
  try {
    const {
      name, counselors, clients, completed, type, report, time, pictures = [],
    } = req.body;

    if (req.files) {
      const promises = [];

      req.files.forEach((file) => {
        promises.push(uploadImage(file, req.body));
      });

      const result = await Promise.all(promises);
      result.forEach((url) => {
        pictures.push(url);
      });
    }
    const result = await sessionController.editSession({
      _id: req.params._id, name, counselors, clients, completed, type, report, time, pictures,
    });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteSession = async (req, res, next) => {
  try {
    const result = await sessionController.deleteSession(req.params._id);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getUserSessions = async (req, res, next) => {
  try {
    const result = await sessionController.getUserSessions(req.params._id, req.params.page);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

router.post('/create', multer.array('files', 5), createSession);
router.put('/edit/:_id', multer.array('files', 5), editSession);
router.post('/delete/:_id', deleteSession);
router.get('/recent/:location', getRecentActivities);
router.get('/getbydate/:date/:location', getSessionsByDate);
router.get('/user/:_id/:page', getUserSessions);

module.exports = router;
