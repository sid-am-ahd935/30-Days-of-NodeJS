const express = require('express');
const app = express();
const productRoutes = require('./routes');


app.use(productRoutes)

const port = "8000";
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});