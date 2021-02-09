const jwt = require('jsonwebtoken');
exports.verifyToken = function(req, res, next) {
    console.log("Verify Token Check");
    if (!req.headers.authorization) {
        return res.status(401).send("Unauthorization request");
    }
    let token = req.headers.authorization.split(' ')[1];
    console.log(`the token is: ${token}`);
    if (!token) {
        return res.status(401).send("Unauthorization request");
    }
    let payload = jwt.verify(token, 'secretKey');
    if (!payload) {
        return res.status(401).send("Unauthorization request");
    }
    console.log(payload);
    next();
}

// This function doesn't check for errors, it assumes that verifyToken function was called already.
exports.getPayload = function(req) {
    let token = req.headers.authorization.split(' ')[1];
    let payload = jwt.verify(token, 'secretKey');

    return payload;
}