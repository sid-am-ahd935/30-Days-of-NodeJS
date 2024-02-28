const { ProductWithCategory, Category } = require('./models');

async function createProductView(req, res) {
    try {
        let newProduct = {
            name: req.query.name,
            price: req.query.price,
            quantity: req.query.quantity,
            category: req.query.categoryId
        }
        const product = new ProductWithCategory(newProduct);
        await product.save();

        return res.status(200).json({
            message: "success",
            desc: "Product created successfully"
        });
    } catch(err) {
        return res.status(401).json({
            message: "error",
            desc: "There was an error creating the product: " + err
        });
    }
}


async function getAllProductsView(req, res) {
    try {
        const all_products = await ProductWithCategory.find({}).populate("category");
        return res.status(200).json({
            message: "success",
            products: all_products
        });
    } catch(err) {
        return res.status(500).json({
            message: "error",
            desc: "There was a problem retrieving all products: " + err
        });
    }
}

async function addCategoryView(req, res) {
    try {
        const { name } = req.query;
        const newCategory = new Category({ name });
        await newCategory.save();
        res.status(201).json({ message: "Category created successfully", category: newCategory });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error("Error in creating category:", error);
    }
}

async function getCategoriesView(req, res) {
    try {
        const categories = await Category.find({})
        res.send(categories)
    } catch (error) {
        console.error("Error while populating products with category:", error);
        throw error;
    }
}




module.exports = {
    createProductView,
    getAllProductsView,
    addCategoryView,
    getCategoriesView
};