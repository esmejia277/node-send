const Links = require('../models/Link');
const shortid = require('shortid');
const bcrypt = require('bcrypt');

exports.newLink = async (req, res, next) => {
  
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