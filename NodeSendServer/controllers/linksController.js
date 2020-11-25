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
  
  const { original_name } = req.body;
  
  const link = new Links();
  link.url = shortid.generate();
  link.name = shortid.generate();
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


exports.getLink = async (req, res, next) => {
  
  const { url } = req.params;

  // check if the link exists
  const link = await Links.findOne({ url });

  if (!link) {
    res.status(404).json({ msg: 'Link does not exists'});
    return next();
  }

  const { name, downloads } = link;

  res.json({ file: name })

  // if number of downloads is equal to 1, delete de file
  if (downloads === 1 ) {
    req.file = name;
    
    await Links.findOneAndRemove(req.params.url);
    
    next();
    
  } else {
    // if number of downloads is greater than 1, reduce 1 
    link.downloads--;
    await link.save()
  }
}