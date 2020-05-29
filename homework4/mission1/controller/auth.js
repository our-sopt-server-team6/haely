let util = require('../modules/util');
let statusCode = require('../modules/statusCode');
let resMessage = require('../modules/responseMessage');
const jwt = require('../modules/jwt');
const TOKEN_EXPIRED = -3
const TOKEN_INVALID = -2

const auth = {
    localVerify : async (req, res) => {
        var token = req.headers.token;
            if (!token) {
                return res.json(util.fail(statusCode.BAD_REQUEST, resMessage.EMPTY_TOKEN));
            }
            const user = await jwt.verify(token);
            if (user == TOKEN_EXPIRED) {
                return res.json(util.fail(statusCode.UNAUTHORIZED, resMessage.EXPIRED_TOKEN));
            }
            if (user == TOKEN_INVALID) {
                return res.json(util.fail(statusCode.UNAUTHORIZED, resMessage.INVALID_TOKEN));
            }
            if (user.idx == undefined) {
                return res.json(util.fail(statusCode.UNAUTHORIZED, resMessage.INVALID_TOKEN));
            }
            return res.json(util.success(statusCode.OK, resMessage.AUTH_SUCCESS));
    },
    localReIssue : async (req, res) => {
        const refreshToken = req.headers.refreshtoken;
        if (!refreshToken) {
            return res.json(util.fail(statusCode.BAD_REQUEST, resMessage.EMPTY_TOKEN));
        }
        const newToken = await jwt.refresh(refreshToken);
        if (newToken == TOKEN_EXPIRED) {
            return res.json(util.fail(statusCode.UNAUTHORIZED, resMessage.EXPIRED_TOKEN));
        }
        if (newToken == TOKEN_INVALID) {
            return res.json(util.fail(statusCode.UNAUTHORIZED, resMessage.INVALID_TOKEN));
        }
        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.ISSUE_SUCCESS, {accessToken: newToken}));
    }
}

module.exports = auth;