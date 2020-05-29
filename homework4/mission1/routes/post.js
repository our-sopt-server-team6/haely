var express = require('express');
var router = express.Router();

const postController = require('../controller/post');
const authUtil  = require('../middlewares/auth');

router.get('/', postController.readAllPost);
router.get('/:idx', postController.readPost);
router.post('/', postController.creatPost);
router.put('/:idx', postController.updatePost);
router.delete('/:idx', postController.deletePost);

module.exports = router;