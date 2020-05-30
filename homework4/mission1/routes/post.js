var express = require('express');
var router = express.Router();

const postController = require('../controller/post');
const authUtil  = require('../middlewares/authUtil');

router.get('/', authUtil.checkToken, postController.readAllPost);
router.get('/:idx', authUtil.checkToken, postController.readPost);
router.post('/', authUtil.checkToken, postController.creatPost);
router.put('/:idx', authUtil.checkToken, postController.updatePost);
router.delete('/:idx', authUtil.checkToken, postController.deletePost);

module.exports = router;