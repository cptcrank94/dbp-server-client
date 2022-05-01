const bcrypt = require("bcryptjs/dist/bcrypt");
const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;
const { refreshToken: RefreshToken } = db;

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

/*exports.logout = async(req, res) => {
    try {
        const token = req.headers["x-access-token"];
        await Token.findOneAndDelete({ token: token });
        return res.status(200).send({ success: "User logged out!"});
    } catch (err) {
        return res.status(500).send({ error: "Internal Server Error!"});
    }
}*/

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
                let accessToken = await jwt.sign(
                    { id: user.id },
                    config.secret,
                    {
                        expiresIn: config.jwtExpiration,
                    }
                );

                let token = await RefreshToken.createToken(user);

                user.refreshToken = token;
                user.accessToken = accessToken;

                res.status(200).send(user);

                /*User.findById(user._id)
                    .then(data => {
                        res.send(user);
                    }).catch(err => {
                        res.status(500).send({message: err.message || "Es ist ein Fehler beim Abrufen des Users aufgetreten. "})
                    })*/
            } else {
                return res.status(401).send({ message: "Falsches Passwort!" } );
            }
        }
    } catch(err) {
        return res.status(500).send({ message: err.message || "Internal Server Error!" });
    }
};

exports.refreshToken = async (req, res) => {
    const refreshToken = req.headers["x-access-token"];
    if (refreshToken == null) {
        return res.status(403).send("Refresh Token wird benötigt!");
    }
    try {
        let token = await RefreshToken.findOne({token: refreshToken});
        if (!token) {
            return res.status(403).send("Refresh Token nicht gefunden!");
        }
        
        if(RefreshToken.verifyExpiration(token)) {
            console.log("Bin hier");
            RefreshToken.findByIdAndRemove(token._id, {useFindAndModify: false}).exec();
            return res.status(403).send("Refresh Token abgelaufen. Bitte erneut einloggen!");
        }

        let newToken = await jwt.sign(
            { id: token.user },
            config.secret,
            {
                expiresIn: config.jwtExpiration,
            }
        );

        return res.status(200).send({
            accessToken: newToken,
            refreshToken: token.token,
        });
    } catch (err) {
        return res.status(500).send(err);
    }
}