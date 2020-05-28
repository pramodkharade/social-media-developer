const mongoose = require('mongoose');
const validator = require('validator');
const gravatar = require('gravatar')
const User = require('../models/usersModel');


exports.getUsers = (req, res, next) => {
  res.send('Get Users');
}

exports.setUserRegister = (req, res, next) => {
  const {name, email, avatar, password} = req.body
  // to get avatar from github profile.
  const avatar = gravatar.url(req.body.email, {
    s: '200', // Size
    r: 'pg', // Rating
    d: 'mm' // Default
  });
  res.send('User Register');
}