const mongoose =  require('mongoose');
const connectToMongoDB = require('./database');
connectToMongoDB();


const categorySchema = new mongoose.Schema({
    name: { type: String, required: true }
});
const Category = mongoose.model("Category", categorySchema);


const productSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true},
    price: { type: Number },
    quantity: { type: Number },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }
});
const ProductWithCategory = mongoose.model("ProductWithCategory", productSchema);


module.exports = {
    ProductWithCategory,
    Category
};