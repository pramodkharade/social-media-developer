const mongoose = require('mongoose');
const validator = require('validator');
const gravatar = require('gravatar')
const User = require('../models/usersModel');
const getValidateRegister = require('../utils/validations/register');


exports.getUsers = (req, res, next) => {
  res.send('Get Users');
}

exports.setUserRegister = async (req, res, next) => {
  try {
    let avatar;
    const {errors, isValid} = getValidateRegister(req.body);
    // Check Validation
    console.log('isValid:  ', isValid);
    if (isValid) {
      return res.status(400).json(errors);
    }
    console.log('Email exist before:');
    const user = await User.findOne({
      email: req.body.email
    });

    if (user) {
      errors.email = 'Email already exists';
      res.status(400).json(errors);
    } else {
      // to get avatar from github profile.
      avatar = gravatar.url(req.body.email, {
        s: '200', // Size
        r: 'pg', // Rating
        d: 'mm' // Default
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar
      });
      console.log('New Object:', newUser);
      const newUserObj = await newUser.save();
      return res.status(201).json(newUserObj);
    }
  } catch (error) {
    return res.json(error.message);
  }
}

