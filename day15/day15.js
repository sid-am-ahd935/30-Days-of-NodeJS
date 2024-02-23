const express = require('express');
const app = express();

function loggingMiddleware(req, res, next) {
    // Your implementation here
    console.log(`Timestamp: ${new Date()}`);
    console.log(`HTTP method: ${req.method}`);
    console.log(`URL: ${req.originalUrl || req.url}`);
    console.log('Request Headers:', req.headers);
    console.log('Request Body:', req.body);
    next();
}


app.get("/", (req, res) => {
    res.send('Hello World!');
});

app.get("/greet", (req, res) => {
    res.send(`Hello ${req.query.name || "Guest"}`);
});

app.use(loggingMiddleware);

const port = "8000";
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});