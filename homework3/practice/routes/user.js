var express = require('express');
var router = express.Router();
let User = require('../models/user');
let util = require('../modules/util');
let statusCode = require('../modules/statusCode');
let resMessage = require('../modules/responseMessage');

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
    //already ID
    if (User.filter(user => user.id == id).length > 0) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.ALREADY_ID));
        return;
    }
    User.push({
      id, 
      name,
      password, 
      email
    });
    res.status(200).send(User);
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
    const user = User.filter(user => user.id == id);
    if (user.length == 0) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
        return;
    }
    if (user[0].password !== password ) {
        res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, resMessage.MISS_MATCH_PW));
        return;
    }
    res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.LOGIN_SUCCESS, {userId: id}));
});

router.get('/profile/:id', async (req, res) => {
    const id = req.params.id;
    const user = User.filter(user => user.id == id)[0];
    if (user === undefined) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
        return;
    }
    const dto = {
        id: user.id,
        name: user.name,
        email: user.email
    }
    res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.READ_PROFILE_SUCCESS, dto));
});

module.exports = router;