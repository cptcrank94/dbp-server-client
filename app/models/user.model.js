module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            username: String,
            password: String,
            token: String
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