/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */
const express = require('express');
const Multer = require('multer');

const userController = require('../controllers/user-controller');

const multer = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  // dest: '../images'
});

const uploadImage = require('../helpers/aws');

const router = express.Router();

const createUser = async (req, res, next) => {
  try {
    const result = await userController.createUser(req.body);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getActiveClients = async (req, res, next) => {
  try {
    const result = await userController.getClients();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getActiveCounselors = async (req, res, next) => {
  try {
    const result = await userController.getActiveCounselors();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const result = await userController.login({ username, password });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const result = await userController.getUser(req.params._id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const editPicture = async (req, res, next) => {
  try {
    let pictureUrl;
    if (req.file) {
      pictureUrl = await uploadImage(req.file);
    }

    const result = await userController.editPicture({ _id: req.params._id, pictureUrl });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

router.post('/register', createUser);
router.post('/login', login);
router.post('/editProfilePicture/:_id', multer.single('file'), editPicture);
router.get('/activeClients', getActiveClients);
router.get('/activeCounselors', getActiveCounselors);
router.get('/:_id', getUser);

module.exports = router;
