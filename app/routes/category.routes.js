module.exports = app => {
    const categorys = require("../controllers/category.controller.js");
    var router = require("express").Router();
    const auth = require("../middleware/auth");
    // Neue Kategorie erstellen
    router.post("/", categorys.create);
    // Alle Kategorien anzeigen
    router.get("/", categorys.findAll);
    // Zeige Kategorie mit ID an
    router.get("/:id", categorys.findOne);
    // Eine Kategorie updaten
    router.put("/:id", categorys.update);
    // Eine Kategorie anhand der ID löschen
    router.delete("/:id", auth, categorys.delete);
    // Alle Kategorien löschen
    router.delete("/", auth, categorys.deleteAll);
    app.use("/api/categorys", router);
}