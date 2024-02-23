const Product = require('./models');

/**
 * Creates a new product in MongoDB
 * @param {Object} product - Product object with properties name, price, and quantity
 */
async function createProduct(product) {
    var status = { success: {}, error: {} };
    try {
        const newProduct = new Product(product);
        await newProduct.save();

        console.log("Product added successfully", product);
        status.success = {
            status: 200,
            message: "success",
            desc: "Product added successfully " + product
        }
        return status;
    } catch(err) {
        console.error("Error while adding product to database:", err);
        status.error = {
            status: 401,
            message: "error",
            desc: "Error while adding product to database " + err
        }
        return status;

    }
}

/**
 * Retrieves all products from MongoDB
 * @returns {Array} - Array of product objects
 */
async function getAllProducts() {
    try {
        const products = await Product.find({});
        console.log(products);
        return products;
    } catch(err) {
        console.error("Error while finding all products from database:", err);
    }
}

/**
 * SELF-MADE
 * Retrieves the first product with name in MongoDB
 * @param {String} productName - Name of the product to get ID
 * @returns {String || null} - Product ID or null
 */
async function getProductId(productName) {
    try {
        const productIds = await Product.findOne({
            name: productName
        });
        console.log(productIds);
        const productId = (productIds?.["_id"]?.["_id"]);
        return productId;
    } catch(err) {
        console.error("Error while finding product ID from database:", err);
    }
}

/**
 * Updates a product in MongoDB
 * @param {string} productId - ID of the product to update
 * @param {Object} updatedProduct - Updated product object
 */
async function updateProduct(productId, updatedProduct) {
    var status = { success: {}, error: {} };
    try {
        await Product.findByIdAndUpdate(productId, updatedProduct, { new: true, upsert: true });
        console.log("Product updated successfully", productId);
        status.success = {
            status: 200,
            message: "success",
            desc: "Product updated successfully " + productId
        }
        return status;
    } catch(err) {
        console.error(err);
        status.error = {
            status: 401,
            message: "error",
            desc: "Error while updating product in database " + err
        }
        return status;
    }

}

/**
 * Deletes a product from MongoDB
 * @param {string} productId - ID of the product to delete
 */
async function deleteProduct(productId) {
    var status = { success: {}, error: {} };
    try {
        await Product.findByIdAndDelete(productId);
        console.log("Product deleted successfully", productId);
        status.success = {
            status: 200,
            message: "success",
            desc: "Product deleted successfully " + productId
        }
        return status;
    } catch(err) {
        console.error(err);
        status.error = {
            status: 401,
            message: "error",
            desc: "Error while deleting product from database " + err
        }
        return status;
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
    getProductId
};