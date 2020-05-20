const pool = require('../modules/pool');
const encryptionManager = require('../modules/security/encryptionManager');

const table = 'user';

const user = {
    checkUser: async(id) =>{
        const query = `SELECT * FROM ${table} WHERE id = "${id}"`;
        try{
            const result = await pool.queryParam(query);
            if(result.length === 0){
                return false;
            } 
            else{
                return true;
            } 

        }catch(err){
            console.log('checkUser error : ', err);
            throw err;
        }
    },

    signup : async(id, name, hashedPassword, salt, email) => {
        const fields = 'id, name, password, salt, email';
        const questions = '?, ?, ?, ?, ?';
        const values = [id, name, hashedPassword, salt, email]; //db 내에 password column에 진짜 password 대신 hashedPassword
        const query = `INSERT INTO ${table}(${fields}) VALUES(${questions})`;
        try{
            const result = await pool.queryParamArr(query, values);
            const insertId = result.insertId;
            return insertId;
        } catch(err){
            if(err.errno == 1062){
                console.log('signup ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('signup ERROR : ', err);
            throw err;
        }
    },
    
    signin : async(id, password) => {
        const query = `SELECT * FROM ${table} WHERE id = "${id}"`;
        try{
            const result = await pool.queryParam(query);
            const user = result[0];
            const salt = user.salt;
            const hashedPassword = await encryptionManager.encryption(password, salt);
            if(user.password === hashedPassword){
                return result;
            } 
            else{
                return false;
            }
        } catch(err){
            
            console.log('signin ERROR : ', err);
            throw err;
        }
    }
}

module.exports = user;