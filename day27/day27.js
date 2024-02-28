const express = require('express');
const jwt = require('jsonwebtoken');
const secretKey = "This is a very long key, hard to guess...";
const app = express();

function generateToken(username) {
    const payload = {
      username: username
    };
    const options = { expiresIn: '1h' };
    return jwt.sign(payload, secretKey, options);
}

function verifyToken(token) {
    try {
        return jwt.verify(token, secretKey);
    } catch(err) {
        throw new Error('Invalid token');
    }
}

function authorization(requiredRole) {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;
        if(!authHeader) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const token = authHeader.split(' ')[1];
        try {
            const decodedToken = verifyToken(token);
            req.user = decodedToken.user;
        } catch(err) {
            return res.status(401).json({ message: "Invalid token" });
        }

        if(requiredRole) {
            if(req.user.role != requiredRole) {
                return res.status(403).json({ message: "Forbidden" });
            }
        }
        next();
    };
}

app.get('/protected', (req, res) => {
    res.send("Welcome, authorized user!");
});
// app.get('/protected', authorization('admin'), (req, res) => {
//     res.send("Welcome, authorized user!");
// });

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

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal server error" });
});

const port = "8000";
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});