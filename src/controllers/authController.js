const User = require('../models/usersModel');

exports.getAuthenticate = async (req, res, next) => {
  try {
    console.log("Request is:", req.user.id);
    const user = await User.findById(req.user.id).select('-password');
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      msg: error.message
    });
  }
}