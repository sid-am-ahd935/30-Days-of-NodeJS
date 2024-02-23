const express = require("express");
const app = express();
const port = "8888";

/**
 * Handles GET requests to "/greet" endpoint
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
function greetHandler(req, res) {
    var name = req.query.name || "Guest";
    res.send(`Hello ${name}!`);
}

app.get("/greet", greetHandler);
app.listen(port, () => {
    console.log(`Server is connected on http://localhost:${port}`);
});