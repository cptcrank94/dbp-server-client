const db = require("../models");
const Item = db.items;

// Create and save a new Card
exports.create = (req, res) => {
    if(!req.body.title) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    const item = new Item({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        parent: req.body.parent,
        category: req.body.category,
        featured: req.body.featured ? req.body.features : false,
        extras: req.body.extras,
        allergies: req.body.allergies,
    });

    /*

            price: [{
                size: { type: String },
                priceTag: { type: String } 
            }],
            extras: [{
                name: { type: String },
                price: { type: String }
            }],
            allergies: [{
                name: { type: String }
            }]

    */

    item
        .save(item)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Es ist ein Fehler beim Erstellen eines Artikels aufgetreten."});
        });
};

// Retrieve all Cards
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
    Item.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Es ist ein Fehler beim Abrufen aller Artikel aufgetreten." })
        })
};

// Find a single card
exports.findOne = (req, res) => {
    const id = req.params.id;
    Item.findById(id)
        .then(data => {
            if (!data) res.status(404).send({ message: `Konnte kein Artikel mit der ID ${id} finden.`})
            else res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: `Fehler beim Abrufen des Artikels mit der ID ${id}.`})
        });
};

// Update a card by ID
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Daten dürfen nicht leer sein." });
    }
    const id = req.params.id;
    Item.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({message: `Konnte Artikel mit der ID ${id} nicht aktualisieren.`});
            } else res.send({ message: "Der Artikel wurde aktualisiert." });
        })
        .catch(err => {
            res.status(500).send({ message: `Fehler beim aktualisieren der Kategorie mit der ID ${id}.`});
        });
};

// Delete a card by ID
exports.delete = (req, res) => {
    const id = req.params.id;
    Item.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Artikel mit der ID ${id} konnte nicht gelöscht werden. `});
            } else {
                res.send({message: "Artikel wurde erfolgreich gelöscht!"});
            }
        })
        .catch(err => {
            res.status(500).send({ message: `Konnte den Artikel mit der ID ${id} nicht löschen.`});
        });
};

// Delete all cards
exports.deleteAll = (req, res) => {
    Item.deleteMany({})
        .then(data => {
            res.send({ message: `${data.deletedCount} Artikel wurden erfolgreich gelöscht!`});
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Fehler beim Löschen aller Artikel. "});
        });
};