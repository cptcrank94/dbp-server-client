module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            title: String,
            description: String,
            price: [{
                size: { type: String },
                priceTag: { type: String } 
            }],
            category: String,
            featured: Boolean,
            extras: [{
                name: { type: String },
                price: { type: String }
            }],
            allergies: Array
        },
        { timestamps: true }
    );
    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    const items = mongoose.model("items", schema);
    return items;
};