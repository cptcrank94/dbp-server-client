const bcrypt = require("bcryptjs/dist/bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;

// Register
/*exports.create = async (req, res) => {
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
};*/

// Refresh Token generieren
exports.refreshToken = async(req, res) => {
    try {
        const { refreshToken } = req.body;
        if(!refreshToken) {
            return res.status(403).send({ message: "Zugang verwehrt, Token nicht vorhanden!" } );
        } else {
            const checkToken = await Token.findOne({ refreshToken: refreshToken});
            if (!checkToken) {
                return res.status(401).send({message: "Token abgelaufen!"});
            } else {
                const payload = jwt.verify(checkToken.token, process.env.REFRESH_TOKEN_KEY);
                const accessToken = jwt.sign(
                    { user: payload },
                    process.env.ACCESS_TOKEN_KEY,
                    {
                        expiresIn: "10m",
                    }
                );
                return res.status(200).send({ accessToken } );
            }
        }

    } catch(err) {
        return res.status(500).send({error: "Internal Server Error!"});
    }
}

exports.logout = async(req, res) => {
    try {
        const { refreshToken } = req.body;
        await Token.findOneAndDelete({ token: refreshToken });
        return res.status(200).send({ success: "User loggoed out!"});
    } catch (err) {
        return res.status(500).send({ error: "Internal Server Error!"});
    }
}

// Login
exports.login = async (req, res) => {
    const { username, password } = req.body;
    
    if (!(username && password)) {
        res.status(400).send("Alle Felder sind auszufüllen!");
    }
    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).send({ message: "Keinen Nutzer gefunden!" });
        } else {
            let valid = await bcrypt.compare(password, user.password);
            if (valid) {
                const accessToken = await jwt.sign(
                    { user: { _id, username } },
                    process.env.ACCESS_TOKEN_KEY,
                    {
                        expiresIn: "10m",
                    }
                );

                const refreshToken = await jwt.sign(
                    { user: {_id, username } },
                    process.env.REFRESH_TOKEN_KEY,
                    {
                        expiresIn: "1d",
                    }
                )

                user.refreshToken = refreshToken;
                user.accessToken = accessToken;

                User.findById(user.id)
                    .then(data => {
                        res.send(data);
                    }).catch(err => {
                        res.status(500).send({message: err.message || "Es ist ein Fehler beim Abrufen des Users aufgetreten. "})
                    })
            } else {
                return res.status(401).send({ message: "Falsches Passwort!" } );
            }
        }
    } catch(err) {
        return res.status(500).send({ message: err.message || "Internal Server Error!" });
    }
};