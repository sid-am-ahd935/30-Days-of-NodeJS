const express = require('express');
const app = express();
const { errorHandler } = require('./errorHandler');
const port = 8000;


// Route
app.get('/', (req, res) => {
    throw new Error("This route is broken");
});

// Middleware
// Middleware is below route '/' so that home can work without this Middleware
app.use((req, res, next) => {
    throw new Error('Something in the middleware broke!');
});

app.get('/home', (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Home route is working"
    })
});

// Use the custom error handling middleware at the very bottom to cover all routes and middlewares
app.use(errorHandler);

app.listen(port, () => {
    console.log(`App is listening on port http://localhost:${port}`);
});