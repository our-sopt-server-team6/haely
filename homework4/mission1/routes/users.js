var express = require('express');
var router = express.Router();
let User = require('../models/user');
let util = require('../modules/util');
let statusCode = require('../modules/statusCode');
let resMessage = require('../modules/responseMessage');

const encryptionManager = require('../modules/security/encryptionManager');
const crypto = require('crypto');

router.post('/signup', async (req, res) => {
    const {
        id,
        name,
        password,
        email
    } = req.body;
    if (!id || !name || !password || !email) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        return;
    }
    // 사용자 중인 아이디가 있는지 확인
    const already = await User.checkUser(id);
    if (already === true) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.ALREADY_ID));
        return;
    }

    const salt = (await crypto.randomBytes(32)).toString('hex');
    const hashedPassword = encryptionManager.encryption(password, salt);

    const resultIdx = await User.signup(id, name, hashedPassword, salt, email);
    if (resultIdx === -1) {
        return res.status(statusCode.DB_ERROR)
            .send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
    }
    res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.CREATED_USER, req.body));
});


router.post('/signin', async (req, res) => {
  const {
      id,
      password
  } = req.body;
  if (!id || !password) {
      res.status(statusCode.BAD_REQUEST)
          .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
      return;
  }

  const already = await User.checkUser(id);
    if (already === false) { //no user using 'id'
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
        return;
    }

  const result = await User.signin(id, password);
  if (result === false) {
    return res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, resMessage.MISS_MATCH_PW));
  }
  res.status(statusCode.OK)
    .send(util.success(statusCode.OK, resMessage.LOGIN_SUCCESS, result));
});

module.exports = router;