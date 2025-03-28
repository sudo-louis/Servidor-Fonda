const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    provider: { type: mongoose.Schema.Types.ObjectId, ref: "Provider", required: true },
    image: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);