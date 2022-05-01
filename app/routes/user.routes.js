module.exports = app => {
    const user = require("../controllers/user.controller.js");
    var router = require("express").Router();
    const auth = require("../middleware/auth");
    // Als User einloggen
    router.post("/login", user.login);
    // Refresk Token
    router.post("/refresh-token", user.refreshToken);
    // Logout
    //router.delete("/logout", user.logout);
    app.use("/api/auth", router);
}