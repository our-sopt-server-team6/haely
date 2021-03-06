let Post = require('../models/post');
let util = require('../modules/util');
let statusCode = require('../modules/statusCode');
let resMessage = require('../modules/responseMessage');
var moment = require('moment');
const jwt = require('../modules/jwt');

const post = {
    readAllPost : async (req, res) => {
        const result = await Post.readAll();
        res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.READ_POST_SUCCESS, result));
    },

    readPost : async (req, res) => {
        const idx = req.params.idx;
        if (!idx) {
            res.status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
            return;
        }
    
        const already = await Post.checkPost(idx);
        if (already === false) { //no user using 'id'
            res.status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_POST));
            return;
        }
    
        const result = await Post.read(idx);
    
        res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.READ_POST_SUCCESS, result));
    },

    creatPost : async (req, res) => {
        const {
            authorId,
            title, 
            content
        } = req.body;

        if (!authorId || !title || !content) {
            res.status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
            return;
        }
        var now = moment();
        const createdAt = await now.format('YYYY-MM-DD');
        
        const result = await Post.create(authorId, title, content, createdAt);
        
        if(result.affectedRows == 0){
            console.log('affectedRows 0');
            return res.status(statusCode.DB_ERROR)
            .send(util.fail(statusCode.DB_ERROR, resMessage.CREATE_FAIL));
        }
        res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.CREATE_POST_SUCCESS, req.body));
    },

    updatePost : async (req, res) => {
        const idx = req.params.idx;
        const {
            authorId,
            title, 
            content
        } = req.body;
    
        if (!idx) {
            res.status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
            return;
        }
    
        const already = await Post.checkPost(idx);
        if (already === false) { //no user using 'id'
            res.status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_POST));
            return;
        }
        
        var now = moment();
        const createdAt = await now.format('YYYY-MM-DD');
    
        const updatePost = {authorId: authorId, title: title, content:content, createdAt: createdAt};
    
        const newPost = await Post.update(idx, updatePost);
    
        if (newPost.affectedRows == 0) {
            return res.status(statusCode.DB_ERROR)
            .send(util.fail(statusCode.DB_ERROR, resMessage.UPDATE_FAIL));
        }
        
        res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.UPDATE_POST_SUCCESS, req.body));
    
    },

    deletePost : async (req, res) => {
        const idx = req.params.idx;
        if (!idx) {
            res.status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
            return;
        }
        const already = await Post.checkPost(idx);
        if (already === false) { //no user using 'id'
            res.status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_POST));
            return;
        }
        
        const result = await Post.delete(idx);
        if(result.affectedRows == 0){
            return res.status(statusCode.DB_ERROR)
            .send(util.fail(statusCode.DB_ERROR, resMessage.DELETE_FAIL));
        }
        res.status(statusCode.OK)
            .send(util.success(statusCode.NO_CONTENT, resMessage.DELETE_SUCCESS));
        
    }

};

module.exports = post;