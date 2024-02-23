const secret_key = "A very long secret key is to be provided...";
const jwt = require("jsonwebtoken");

function generateToken(username) {
    const payload = {
      username: username
    };
    const options = { expiresIn: '1h' };
    return jwt.sign(payload, secret_key, options);
}

/**
 * Authentication middleware for Express
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
function authenticationMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) {
        return res.status(403).json({
            message: "Token not provided"
        });
    }

    try {
        jwt.verify(token, secret_key, (err, user) => {
            if(err) {
                console.log(err.message);
                return res.status(401).json({message: "Unauthorized"});
            }
            res.user = user;
            return res.status(200).json({message: `Welcome ${user.username}`});
        });
    } catch(err) {
        return res.status(500).json({
            message: err.message
        });
    }

    next();
}



module.exports = {
    authenticationMiddleware,
    generateToken
}