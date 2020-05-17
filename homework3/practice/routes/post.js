var express = require('express');
var router = express.Router();
let Post = require('../models/post');
let util = require('../modules/util');
let statusCode = require('../modules/statusCode');
let resMessage = require('../modules/responseMessage');
var moment = require('moment');

router.get('/', async (req, res) => {
    const dto = await Post.readAll();
    res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.READ_POST_SUCCESS, dto));
});

router.get('/:idx', async (req, res) => {
    const idx = req.params.idx;
    const dto = await Post.read(idx);
    if (!idx) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
        return;
    }
    res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.READ_POST_SUCCESS, dto));
});

router.post('/', async (req, res) => {
    const {
        author,
        title, 
        content
    } = req.body;
    if (!author || !title || !content) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        return;
    }
    var now = moment();
    const created_at = await now.format('YYYY-MM-DD');
    
    const idx = await Post.create(author, title, content, created_at);
    
    if(!idx){
        return res.status(statusCode.DB_ERROR)
        .send(util.fail(statusCode.DB_ERROR, resMessage.CREATE_FAIL));
    }
    res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.CREATE_POST_SUCCESS, idx));
});

router.put('/:idx', async (req, res) => {
    const idx = req.params.idx;
    const {
        author,
        title, 
        content
    } = req.body;
    
    var now = moment();
    const created_at = await now.format('YYYY-MM-DD');

    if(!idx){
        res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
    return;
    }
    const updatePost = {author: author, title: title, content:content};

    const newPost = await Post.update(idx, updatePost);
    newPost.created_at = created_at;

    if (!newPost) {
        return res.status(statusCode.DB_ERROR)
        .send(util.fail(statusCode.DB_ERROR, resMessage.UPDATE_FAIL));
    }
    
    res.status(statusCode.OK)
    .send(util.success(statusCode.OK, resMessage.UPDATE_POST_SUCCESS, newPost));

});

router.delete('/:idx', async (req, res) => {
    const idx = req.params.idx;
    if (!idx) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        return;
    }
    
    if(!await Post.delete(idx)){
        return res.status(statusCode.DB_ERROR)
        .send(util.fail(statusCode.DB_ERROR, resMessage.DELETE_FAIL));
    }
    else{
        res.status(statusCode.OK)
        .send(util.success(statusCode.NO_CONTENT, resMessage.DELETE_SUCCESS));
    }
    
})
module.exports = router;