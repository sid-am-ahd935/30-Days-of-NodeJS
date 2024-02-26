const mongoose = require('mongoose');


async function connectToMongoDB() {
    await mongoose.connect(
        'mongodb://127.0.0.1:27017/Task26_Run1'
    ).then(() => {
        console.log('Database connection successful');
    }).catch((err) => {
        console.error('Database connection failed', err);
    });
}

const productSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
});
const Product = mongoose.model("Product", productSchema);

function getProductStatistics() {
    Product.aggregate([{
      $group: {
        _id: null,
        totalProducts: { $sum: 1 },
        avgPrice: { $avg: '$price' },
        maxQuantity: { $max: '$quantity' }
      }
    }]).then((data) => {
      console.log(data)
    }).catch((err) => {
      console.log(err)
    });
}

async function addProducts() {
    let product_save_promise = null;
    for(let i=0; i<10; i++) {
        let newProduct = {
            name: `Aman's Product: 2${Math.round(Math.random() * 100000000/13/43)}`,
            price: Math.floor(Math.random()*1301/11)*10 + 1,
            quantity: Math.floor(Math.random()*231/13)*100,
        }
        const product = new Product(newProduct);
        product_save_promise = product.save();
        product_save_promise.then(() => {
            console.log("Product added successfully", newProduct);
        }).catch(() => {
            console.log("Product was not added", newProduct);
        });

    }
    // await (() => { j == 10; });
    // cosole.log("exiting addProduct");
    return product_save_promise;
}

async function main() {
    await connectToMongoDB();
    let productSavePromise = addProducts();
    productSavePromise.then(() => {
        getProductStatistics();
    });
}

main();