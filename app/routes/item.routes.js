module.exports = app => {
    const items = require("../controllers/items.controller.js");
    var router = require("express").Router();
    const auth = require("../middleware/auth");
    // Neuen Artikel erstellen
    router.post("/", auth, items.create);
    // Alle Artikel anzeigen
    router.get("/:catName", items.findAll);
    // Zeige Artikel mit ID an
    router.get("/detail/:id", items.findOne);
    // Einen Artikel updaten
    router.put("/:id", auth, items.update);
    // Einen Artikel anhand der ID löschen
    router.delete("/:id", auth, items.delete);
    // Alle Artikel löschen
    router.delete("/", auth, items.deleteAll);
    app.use("/api/items", router);
}