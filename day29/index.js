const express = require('express');
const app = express();

app.get("/", (req, res) => {
    res.send("Welcome")
})
app.get("/error", (req, res, next) => {
    const err = new Error("This is a test error");
    err.statusCode = 400;
    var var1 = "abcd"
    next(err);
});

function errorHandler(err, req, res, next) {
    console.error(err.stack);
    const statusCode = err.statusCode;
    res.status(statusCode).json({
        error: {
            message: err.message
        }
    })
}

app.use(errorHandler);


app.listen(3000, () => {
    console.log("Server listeniong to port 3000");
})