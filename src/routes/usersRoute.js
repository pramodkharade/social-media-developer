const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', usersController.getUsers);

module.exports = router;