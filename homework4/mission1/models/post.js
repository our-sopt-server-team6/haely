const pool = require('../modules/pool');
const encryptionManager = require('../modules/security/encryptionManager');
const postData = require('../modules/data/postData');
const table = 'post';

const post = {
    checkPost: async(idx) =>{
        const query = `SELECT * FROM ${table} WHERE postIdx = ${idx}`;
        try{
            const result = await pool.queryParam(query);
            if(result.length === 0){
                return false;
            } 
            else{
                return true;
            } 

        }catch(err){
            console.log('checkPost error : ', err);
            throw err;
        }
    },

    readAll : async() => {
        const query = `SELECT * FROM ${table}`;
        try{
            const result = await pool.queryParam_Parse(query);
            return result.map(postData);

        } catch(err){
            throw err;
        }
    },

    read : async(idx) => {
        const query = `SELECT * FROM ${table} WHERE postIdx = ${idx}`;
        try{
            const result = await pool.queryParam_Parse(query);
            return postData(result[0]);
        } catch(err){
            throw err;
        }
    },

    create : async(authorId, title, content, createdAt) => {
        const authorIdQuery = `SELECT userIdx FROM user WHERE id = '${authorId}'`;
        const authorIdResult = await pool.queryParam_Parse(authorIdQuery);
        const firstResult = authorIdResult[0].userIdx;

        const fields = 'userIdx, title, content, createdAt';
        const questions = '?, ?, ?, ?';
        const values = [firstResult, title, content, createdAt]; 
        const query = `INSERT INTO ${table}(${fields}) VALUES(${questions})`;
        try{
            const result = await pool.queryParamArr(query, values);
            return result;
        } catch(err){
            throw err;
        }
    },

    update : async(idx, updatePost) => {
        const authorIdQuery = `SELECT userIdx FROM user WHERE id = '${updatePost.authorId}'`;
        const authorIdResult = await pool.queryParam_Parse(authorIdQuery);
        const firstResult = authorIdResult[0].userIdx;

        const fields = 'userIdx = ?, title = ?, content = ?, createdAt = ?';
        const values = [firstResult, updatePost.title, updatePost.content, updatePost.createdAt];
        const query = `UPDATE ${table} SET ${fields} WHERE postIdx = ${idx}`;
        try{
            const result = await pool.queryParamArr(query, values);
            return result;
        } catch(err){
            throw err;
        }
    },

    delete : async(idx) => {
        const query = `DELETE FROM ${table} WHERE postIdx = ${idx}`;
        try{
            const result = await pool.queryParam(query);
            return result;
        } catch(err){
            throw err;
        }
    }

}

module.exports = post;