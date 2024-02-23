function positiveIntegerHandlerMiddleware(err, req, res, next) {
    // console.log("Error From User End");
    return res.status(400).json({
        error: 400,
        message: "Bad Request",
        desc: err.message
    });
}

module.exports = positiveIntegerHandlerMiddleware;