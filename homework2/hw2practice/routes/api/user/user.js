var express = require('express');
var router = express.Router();

// router.get('/', (req, res) =>{
//     const result = {
//         status: 200,
//         message: 'USER'
//     }
//     res.status(200).send(result);
// });

router.get('/login', (req, res) =>{
    const result = {
        status: 200,
        message: 'LOG IN(in /user)'
    }
    res.status(200).send(result);
});

router.get('/signup', (req, res) =>{
    const result = {
        status: 200,
        message: 'SIGN UP(in /user)'
    }
    res.status(200).send(result);
});

module.exports = router;