
const express = require('express');
const app = express();
const rateLimiterMiddleware = require("./rate-limiter-middleware");


app.get("/", rateLimiterMiddleware, (req, res) => {
    return res.status(200).json({
        status: 200,
        message: "You have successfully accessed this page!"
    });
});

const port = "8000";
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});