const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');
const Links = require('../models/Link');

exports.uploadFile = async (req, res, next) => {

  const configMulter = {
    limits: {
      fileSize: req.user ? 1024 * 1024 * 10 : 1024 * 1024
    },
    storage: fileStorage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, __dirname + '/../uploads')
      },
      filename: (req, file, cb) => {
        const extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
        cb(null, `${shortid.generate()}${extension}`);
  
      }
    })
  }
  
  const upload = multer(configMulter).single('file');

  upload(req, res, async (error) => {
    console.log(req.file);
    if (!error) {
      res.json({ file: req.file.filename });
    } else {
      console.log(error);
      return next();
    }
  });
}


exports.deleteFile = async (req, res) => {
  console.log('file', req.file)

  try {
    fs.unlinkSync(__dirname + `/../uploads/${req.file}`);
    console.log('eliminado');
    
  } catch (error) {
    console.log('error', error);
  }
}


exports.download = async (req, res, next) => {

  const { file } = req.params;
  
  const link =  await Links.findOne({
    name: file
  });
  
  const fileDownload = __dirname + '/../uploads/' + file;
  res.download(fileDownload);


  const { name, downloads } = link;

  // delete database entry
  // if number of downloads is equal to 1, delete de file
  if (downloads === 1 ) {
    req.file = name;
    
    await Links.findOneAndRemove(link.id);
    
    next();
    
  } else {
    // if number of downloads is greater than 1, reduce 1 
    link.downloads--;
    await link.save()
  }
}