const express = require('express');
const router = express.Router();
const linksController = require('../controllers/linksController');
const fileController = require('../controllers/fileController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');


router.post('/',
  [
    check('name', 'load a file').not().isEmpty(),
    check('original_name', 'load a file').not().isEmpty()
  ],
  auth,
  linksController.newLink

);

router.get('/:url',
  linksController.getLink,
  fileController.deleteFile
)

module.exports = router