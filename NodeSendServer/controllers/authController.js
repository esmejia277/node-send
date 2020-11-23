const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
require('dotenv').config({ path: 'vars.env'});

exports.authUser = async (req, res, next) => {

  // express validator msg errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { email, password } = req.body;
  
  // check if user is registered
  let registeredUser = await User.findOne({ email });

  if (!registeredUser) {
    res.status(401).json({ msg: 'User does not exists' });
    return next();
  }

  if (bcrypt.compareSync(password, registeredUser.password)) {
    // create json web token
    const token = jwt.sign({
      id: registeredUser._id,
      name: registeredUser.name,
      email: registeredUser.email
    }, process.env.SECRET_KEY, {
      expiresIn: '8h' 
    });

    res.json({ token });

  } else {
    res.status(401).json({ msg: 'Wrong password'})
    return next();
  }

}


exports.authenticatedUser = async (req, res, next) => {

  res.json({
    user: req.user
  });
   
}