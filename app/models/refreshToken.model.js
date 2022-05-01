const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const RefreshTokenSchema = new mongoose.Schema({
    token: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    expiryDate: Date,
});

RefreshTokenSchema.statics.createToken = async function (user) {
    let expiredAt = new Date();

    expiredAt = expiredAt.setSeconds(
        expiredAt.getSeconds() + config.jwtRefreshExpiration
    );
    let _token = await jwt.sign(
        { id: user.id },
        config.secret,
        {
            expiresIn: config.jwtRefreshExpiration,
        }
    );
    let _object = new this({
        token: _token,
        user: user._id,
        expiryDate: expiredAt,
    });
    let refreshToken = await _object.save();
    return refreshToken.token;
};

RefreshTokenSchema.statics.verifyExpiration = (token) => {
    return token.expiryDate.getTime() < new Date().getTime();
}

const RefreshToken = mongoose.model("RefreshToken", RefreshTokenSchema);
module.exports = RefreshToken;