const express = require('express');
const router = express.Router();

const { createProductView, getAllProductsView, updateProductView, deleteProductView } = require('./controllers');

router.post("/createProduct", createProductView);
router.get("/getProducts", getAllProductsView);
router.put('/updateProduct', updateProductView);
router.delete('/deleteProduct', deleteProductView);

module.exports = router;