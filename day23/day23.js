const express = require('express');
const app = express();
const {
    createProductView,
    getAllProductsView,
    addCategoryView,
    getCategoriesView
} = require('./controllers');


app.post("/addProduct", createProductView);
app.get("/getProducts", getAllProductsView);

app.post("/addCategory", addCategoryView);
app.get("/getCategory", getCategoriesView);


const port = "8000";
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});