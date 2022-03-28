module.exports = app => {
    const user = require("../controllers/user.controller.js");
    var router = require("express").Router();
    const auth = require("../middleware/auth");
    // Als User einloggen
    router.post("/login", user.findOne);
    // Neuen User anlegen
    router.post("/register", auth, user.create);
    app.use("/api/user", router);
}