const express = require("express");
const NodeCache = require("node-cache");

const app = express();
const cache = new NodeCache({ stdTTL: 60 * 1 });
// Cache data is set to expire in 1 min for generating examples

function cachingMiddleware(req, res, next) {
    const key = req.originalUrl || req.url;
    const cachedResponse = cache.get(key);

    if(cachedResponse) {
        console.log("Response sent from Cache");
        return res.send(cachedResponse);
    }
    // No cached data proceed with the route handler
    next();
}

function generateData(req, res) {
    // If there was no cache, 'get' will be used
    const randomInt = Math.floor(Math.random()*1000/13*100*13/1000);
    const data = `Your number of the minute is ${randomInt}`;
    const now = new Date()
    const currTime = now.toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric', hour12: false});
    console.log(`A random integer "${randomInt}" was generated at ${currTime}`)

    // Setting the data into cache
    cache.set(req.url, data);
    return res.send(data);
}


app.get('/random', cachingMiddleware, generateData);
const port = "8000";
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});