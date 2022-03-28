module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            title: String,
            uri: String
        },
        { timestamps: true }
    );
    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    const category = mongoose.model("category", schema);
    return category;
};