const express = require('express');
const database = require('./database');
const app = express();

/**
 * Establishes a connection to MongoDB using Mongoose
 */
function connectToMongoDB() {
    database();
  }


app.get("/", (req, res) => {
    res.send('Hello World!');
});

const port = "8000";
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});