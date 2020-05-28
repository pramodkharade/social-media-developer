const express = require('express');
const router = express.Router();
const profilesController = require('../controllers/profilesController');
// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get('/test', profilesController.getUserProfile);

module.exports = router;