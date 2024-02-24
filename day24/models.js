const mongoose =  require('mongoose');
const connectToMongoDB = require('./database');


connectToMongoDB();

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true},
    price: { type: Number },
    quantity: { type: Number }
});
const Product = mongoose.model("Product", productSchema);

module.exports = Product;