const mongoose =  require('mongoose');

async function connectToMongoDB() {
    await mongoose.connect(
        'mongodb://127.0.0.1:27017/Task25_Run1'
    ).then(() => {
        console.log('Database connection successful');
    }).catch((err) => {
        console.error('Database connection failed', err);
    });
}

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true},
    price: { type: Number },
    quantity: { type: Number }
});
const Product = mongoose.model("Product", productSchema);

async function createProductNameIndex() {
    Product.createCollection();
    await Product.collection.createIndex({name: 1}).then(() => {console.log('Index created')}).catch((err) => {console.log('Index could not be created', err)});
    await Product.collection.getIndexes().then((indexes) => {console.log(indexes)}).catch((err) => {console.log('Could not get indexes', err)});
  }

async function main() {
    await connectToMongoDB();
    createProductNameIndex();
}

main();