const express = require("express");
const app = express();
const port = "8000";

// Problem Statement:
// Implement an Express middleware function that logs the timestamp
// and the HTTP method of every incoming request to the server.


function requestLoggerMiddleware(req, res, next) {
    console.log(`Requested URL: "${req.originalUrl}" at ${Date()}`);
    next();
}

app.use(requestLoggerMiddleware);
app.listen(port, () => {
    console.log(`Server is connected on http://localhost:${port}`);
});