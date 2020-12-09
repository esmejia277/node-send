const Links = require('../models/Link');
const shortid = require('shortid');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const Link = require('../models/Link');

exports.newLink = async (req, res, next) => {

  // express validator msg errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  
  console.log(req.body)

  const { original_name, name } = req.body;
  
  const link = new Links();
  link.url = shortid.generate();
  link.name = name;
  link.original_name = original_name;

  // if user is authenticated
  if (req.user) {
    const { password, downloads } = req.body;

    // set downloads limit
    if (downloads) {
      link.downloads = downloads;
    }

    // set password to the file
    if (password) {
      const salt = await bcrypt.genSalt(10);
      link.password = await bcrypt.hashSync(password, salt);
    }
    link.author = req.user.id;
  }



  try {
    // Save in db
    await link.save();
    
    res.json({ msg: link.url });
    next();
    
  } catch (error) {
    console.error(error);
  }
}

exports.allLinks = async (req, res) => {
  try {
    const links = await Links.find({}).select('url -_id');
    res.json({links})
  } catch (error) {
    console.log(error)
  }
}

exports.getLink = async (req, res, next) => {
  
  const { url } = req.params;

  // check if the link exists
  const link = await Links.findOne({ url });

  if (!link) {
    res.status(404).json({ msg: 'Link does not exists'});
    return next();
  }

  const { name } = link;

  res.json({ file: name })

  next();
}