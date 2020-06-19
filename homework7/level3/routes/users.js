const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const AuthMiddleware = require('../middlewares/auth');
// const multer = require('multer');
// const upload = multer({
//     dest: 'upload/'
// });
const upload = require('../modules/multer');
router.post('/signup', UserController.signup);
router.post('/signin', UserController.signin);

/* 
    ✔️ update profile
    METHOD : POST
    URI : localhost:3000/user/profile
    REQUEST HEADER : JWT
    REQUEST BODY : ⭐️image file ⭐️
    RESPONSE DATA : user profile
*/
router.post('/profile', AuthMiddleware.checkToken, upload.single('profile'), UserController.updateProfile);
router.post('/selfies', AuthMiddleware.checkToken, upload.array('selfies', 5), UserController.updateSelfies);

module.exports = router;