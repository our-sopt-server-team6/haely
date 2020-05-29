const express = require('express');
const router = express.Router();

const authController = require('../controller/auth');

router.get('/local', authController.localVerify);
router.get('/local/reissue', authController.localReIssue);

module.exports = router;