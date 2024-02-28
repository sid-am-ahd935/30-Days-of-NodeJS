const tokenMethods = require("./middleware");
const generateToken = tokenMethods.generateToken;
const authenticationMiddleware = tokenMethods.authenticationMiddleware;

const express = require('express');
const app = express();

app.get("/secure", authenticationMiddleware, (req, res) => {
    console.log("You have successfully accessed this page through JWT Authorization!");
    return;
});

app.post("/login", (req, res) => {
    const username = req.query.username;

    if(!username || username == undefined) {
        return res.status(403).json({message:"Username not provided."});
    } else {
        const token = generateToken(username);
        res.json({
          token: token
        });
    }

});


const port = "8000";
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});