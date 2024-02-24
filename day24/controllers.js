const Product = require('./models');


async function createProductView(req, res) {
    try {
        let newProduct = {
            name: req.query.name,
            price: req.query.price,
            quantity: req.query.quantity,
        }

        const product = new Product(newProduct);
        await product.save();
        console.log("Product added successfully", newProduct);

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
        const products = await Product.find({});
        console.log(products);

        return res.status(200).json({
            message: "success",
            products: products
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

        const filter = { name: name };
        const update1 = { price: price };
        let product1 = await Product.findOneAndUpdate(filter, update1, { new: true });

        const update2 = { quantity: quantity };
        let product2 = await Product.findOneAndUpdate(filter, update2, { new: true });

        console.log(`Product ${product1.name} was updated to ${product1.price} (price)`,
        `and ${product2.quantity} (quantity).`);

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

        const filter = { name: name };
        let product = await Product.findOneAndDelete(filter);
        console.log(`Product ${product.name} was deleted.`);

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