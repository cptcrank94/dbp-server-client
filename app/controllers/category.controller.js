const db = require("../models");
const Category = db.category;

// Create and save a new Card
exports.create = (req, res) => {
    if(!req.body.title) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    const category = new Category({
        title: req.body.title,
        prio: req.body.prio,
    });

    category
        .save(category)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Es ist ein Fehler beim Erstellen einer Kategorie aufgetreten."});
        });
};

// Retrieve all Cards
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" },  } : {};
    Category.find(condition)
        .then(data => {
            const sendData = data.sort((a,b) => a - b).reverse();
            res.send(sendData);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Es ist ein Fehler beim Abrufen aller Kategorien aufgetreten." })
        })
};

// Find a single card
exports.findOne = (req, res) => {
    const id = req.params.id;
    Category.findById(id)
        .then(data => {
            if (!data) res.status(404).send({ message: `Konnte keine Kategorie mit der ID ${id} finden.`})
            else res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: `Fehler beim Abrufen der Kategorie mit der ID ${id}.`})
        });
};

// Update a card by ID
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Daten dürfen nicht leer sein." });
    }
    const id = req.params.id;
    Category.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({message: `Konnte Kategorie mit der ID ${id} nicht aktualisieren.`});
            } else res.send({ message: "Die Kategorie wurde aktualisiert." });
        })
        .catch(err => {
            res.status(500).send({ message: `Fehler beim aktualisieren der Kategorie mit der ID ${id}.`});
        });
};

// Delete a card by ID
exports.delete = (req, res) => {
    const id = req.params.id;
    Category.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Kategorie mit der ID ${id} konnte nicht gelöscht werden. `});
            } else {
                res.send({message: "Kategorie wurde erfolgreich gelöscht!"});
            }
        })
        .catch(err => {
            res.status(500).send({ message: `Konnte die Kategorie mit der ID ${id} nicht löschen.`});
        });
};

// Delete all cards
exports.deleteAll = (req, res) => {
    Category.deleteMany({})
        .then(data => {
            res.send({ message: `${data.deletedCount} Kategorien wurden erfolgreich gelöscht!`});
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Fehler beim Löschen aller Kategorien. "});
        });
};