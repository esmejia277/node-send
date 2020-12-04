const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');


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


exports.download = async (req, res) => {
  const file = __dirname + '/../uploads/' + req.params.file;
  res.download(file);
}