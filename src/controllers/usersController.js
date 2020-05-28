const mongoose = require('mongoose');
const validator = require('validator');
const gravatar = require('gravatar')
const User = require('../models/usersModel');
const getValidateRegister = require('../utils/validations/register');


exports.getUsers = (req, res, next) => {
  res.send('Get Users');
}

exports.setUserRegister = (req, res, next) => {
  const {errors, isValid} = getValidateRegister(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // to get avatar from github profile.
  let avatar = gravatar.url(req.body.email, {
    s: '200', // Size
    r: 'pg', // Rating
    d: 'mm' // Default
  });
  const {name, email, avatars, password} = req.body;
  res.send('User Register');
}