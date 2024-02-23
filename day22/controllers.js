const { createProduct, getAllProducts, updateProduct, deleteProduct } = require('./utils');
const { getProductId } = require('./utils');

async function createProductView(req, res) {
    try {
        let newProduct = {
            name: req.query.name,
            price: req.query.price,
            quantity: req.query.quantity,
        }
        await createProduct(newProduct);
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
        var all_products = await getAllProducts();
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


async function updateProductView(req, res) {
    try {
        var { name, price, quantity } = req.query;
        let productId = await getProductId(name);

        await updateProduct({_id: productId}, { price: price, quantity: quantity });
        return res.status(200).json({
            message: "success",
            desc: `Product was updated`
        });
    } catch(err) {
        return res.status(500).json({
            message: "error",
            desc: "There was a problem updating the product: " + err
        });
    }
}

async function deleteProductView(req, res) {
    try {
        var { name } = req.query;
        let productId = await getProductId(name);

        if(!productId) {
            return res.status(400).json({
                message: "error",
                desc: "The product was not found. Please try again."
            });
        }

        await deleteProduct(productId);
        return res.status(200).json({
            message: "success",
            desc: "The product was successfully deleted."
        });
    } catch(err) {
        return res.status(500).json({
            message: "error",
            desc: "There was a problem deleting the product: " + err
        });
    }
}


module.exports = {
    createProductView,
    getAllProductsView,
    updateProductView,
    deleteProductView
};