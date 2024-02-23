const express = require('express');
const middleware = require("./middleware.js");
const port = "8000";
const app = express();

function positiveIntegerHandler(req, res, next) {
    if(req.query.number >= 0) {
        return res.status(200).json({
            message: "Success"
        });
    }
    const err = new Error();
    if(req.query.number < 0) {
        err.message = "Negative Number";
    } else {
        err.message = "Wrong Query Parameter";
    }
    next(err);
}

app.get("/positive", positiveIntegerHandler);
app.use(middleware);
app.listen(port, () => {
    console.log("Server is running on http://localhost:"+port);
})