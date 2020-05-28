const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar')
const User = require('../models/usersModel');
const getValidateRegister = require('../utils/validations/register');
const getValidateLogin = require('../utils/validations/login');

exports.getUsers = (req, res, next) => {
  res.send('Get Users');
}

exports.setUserRegister = async (req, res, next) => {
  try {
    let avatar;
    const {errors, isValid} = getValidateRegister(req.body);
    // Check Validation
    console.log('isValid:  ', isValid);
    if ((!isValid) && (typeof errors === 'object' && Object.keys(errors).length > 0)) {
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
      bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(newUser.password, salt, async(error, newhash) => {
          if (error) {
            throw error;
          }
          newUser.password = newhash;
          const newUserObj = await newUser.save();
          return res.status(201).json(newUserObj);
        });
      });
    }
  } catch (error) {
    return res.json(error.message);
  }
}
// Login check and return token
exports.getUserLogin = async(req, res, next) => {
  try {
    const {errors, isValid} = getValidateLogin(req.body);
    // Check Validation
    if ((!isValid) && (typeof errors === 'object' && Object.keys(errors).length > 0)) {
      return res.status(400).json(errors);
    }
    const user = await User.findOne({
      email: req.body.email
    });
    if (!user) {
      return res.status(404).json('User not found');
    } else {
      // check paaword match
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (isMatch) {
        console.log('IsMatch value:', user);
        const payload = {
          id: user._id,
          name: user.name,
        }
        jwt.sign(payload, "mynodeAPISecret", {
          expiresIn: 3600
        }, (error, token) => {
          if (error) {
            throw error
          }
          return res.json({
            success: true,
            token: 'Bearer ' + token
          })
        });
      } else {
        errors.password = " invalid credential";
        return res.status(400).json(errors);
      }
    }

  } catch (error) {
    return res.json(error.message);
  }
}