const { TokenExpiredError } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");

const config = require("../config/auth.config");

const catchError = (err, res) => {
    if (err instanceof TokenExpiredError) {
        return res.status(401).send("Token abgelaufen!");
    }
    return res.status(401).send("Unautorisiert!");
}

const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send("Ein Token wird zur Authentifizierung benötigt.");
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return catchError(err, res);
        }
        req.user = decoded;
        next();
    });
    
}

module.exports = verifyToken;