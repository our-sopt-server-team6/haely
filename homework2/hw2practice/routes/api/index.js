var express = require('express');
var router = express.Router();

router.get('/', (req, res) =>{
    const result = {
        status: 200,
        message: 'API!!!'
    }
    res.status(200).send(result);
});

router.use('/blog', require('./blog'));
router.use('/user', require('./user'));
  
  module.exports = router;