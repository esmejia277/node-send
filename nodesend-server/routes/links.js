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

router.get('/',
  linksController.allLinks
)


router.get('/:url',
  linksController.hasPassword,
  linksController.getLink
);

router.post('/:url',
  linksController.verifyPassword,
  linksController.getLink
)

module.exports = router