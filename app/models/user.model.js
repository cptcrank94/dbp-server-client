module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            username: {type: String, required: true, unique: true},
            password: {type: String, required: true},
            refreskToken: String,
            accessToken: String
        }
    );
    schema.method("toJSON", function() { 
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    const user = mongoose.model("user", schema);
    return user;
};