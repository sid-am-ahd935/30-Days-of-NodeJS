const express = require('express');
const app = express();
const {
    createProductView,
    getAllProductsView,
    updateProductView,
    deleteProductView
} = require('./controllers');


app.post("/create", createProductView);
app.get("/products", getAllProductsView);
app.put("/update", updateProductView);
app.delete("/delete", deleteProductView);


const port = "8000";
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});