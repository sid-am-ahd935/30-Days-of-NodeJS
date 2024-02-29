// Custom error handling middleware
function errorHandler(err, req, res, next) {
    // console.error(err.stack);
    console.log("Error Handler works!!");
    res.status(500).json({
        error: {
            message: 'Something went wrong! ' + err.message
        }
    })
}

module.exports = {
    errorHandler
}