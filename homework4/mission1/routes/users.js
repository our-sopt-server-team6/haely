var express = require('express');
var router = express.Router();

const userController = require('../controller/user');

router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.get('/:id', userController.readProfile);

module.exports = router;