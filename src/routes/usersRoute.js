const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', usersController.getUsers);

// @route   POST api/users/register
// @desc    register users route
// @access  Public
router.post('/register', usersController.setUserRegister);

module.exports = router;