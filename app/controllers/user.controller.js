const bcrypt = require("bcryptjs/dist/bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;

// Register
exports.create = async (req, res) => {
    const { username, password } = req.body;
    if( !(username && password )) {
        res.status(400).send("Alle Felder sind auszufüllen!");
    }

    // Check if user exist
    const oldUser = await User.findOne({ username });

    if(oldUser) {
        return res.status(409).send("Benutzer existiert bereits.");
    }

    // Hash password 10 times
    encryptedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await new User({
        username: username,
        password: encryptedPassword
    });

    // Create token
    const token = jwt.sign(
        { user_id: user._id, username },
        process.env.TOKEN_KEY,
        {
            expiresIn: "24h",
        }
    );

    user.token = token;

    user
        .save(user)
        .then(data => {
            res.status(201).json(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Es ist ein Fehler beim Erstellen eines Users aufgetreten."});
        });
};

// Login
exports.findOne = async (req, res) => {
    const { username, password } = req.body;
    
    if (!(username && password)) {
        res.status(400).send("Alle Felder sind auszufüllen!");
    }

    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
            { user_id: user._id, username },
            process.env.TOKEN_KEY,
            {
                expiresIn: "24h",
            }
        );

        user.token = token;
        console.log(token);

        User.findById(user.id)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({message: err.message || "Es ist ein Fehler beim Abrufen des Users aufgetreten. "})
            })
    }
};