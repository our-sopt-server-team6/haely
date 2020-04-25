const fs = require('fs');
const crypto = require('crypto');

const title = 'password';

fs.readFile(`${__dirname}/password.txt`, (err, data) => {
    if (err) return console.log (err.message);
    console.log(`${title}.txt 파일에는 이런 비밀번호가 있습니다. \n"${data}"\n`);
    const salt = crypto.randomBytes(32).toString('hex');
    encrypt(salt, data);
});

const encrypt = (salt, password) => {
    crypto.pbkdf2(password, salt.toString(), 1, 32, 'sha512', (err, derivedKey) => {
        if (err) throw err;
        const hashed = derivedKey.toString('hex');
        console.log('salt : ', salt);
        console.log('hashed : ', hashed);
    });
}