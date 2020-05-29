const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
// @route   GET api/auth/
// @desc    get user
// @access  private
router.get('/', auth, authController.getAuthenticate);

module.exports = router;