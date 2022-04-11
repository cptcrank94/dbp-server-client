const jwt = require("jsonwebtoken");
const privateKey = process.env.ACCESS_TOKEN_KEY;

const checkAuth = (req, res, next ) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(401).send("Ein Token wird benötigt");
    } else {
        try {
            const payload = jwt.verify(token, privateKey);
            req.user = payload;
        } catch(error) {
            return res.status(401).send("Ungültiger Token!");
        }
        return next();
    }
}

module.exports = checkAuth;