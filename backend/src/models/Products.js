const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    img: { type: String, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: String, required: true },
    rating: { type: String, required: true },
});

const ProductModel = mongoose.model("products", ProductSchema);

module.exports = ProductModel;