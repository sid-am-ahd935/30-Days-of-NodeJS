const express = require('express');
const app = express();
const User = require('./models');
const { connectToMongoDB, addUserToDatabase } = require('./database');


async function addUsers(no_of_users = 5) {
    for(let i=1; i<=no_of_users; i++) {
        let user = {
            username: `Aman_Clone_${i}`,
            email: `amancloned${i}@email.com`
        }
        addUserToDatabase(user);
    }
}

async function main() {
    await connectToMongoDB();
    await addUsers(3);
}


app.get("/users", async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch(err) {
        res.status(500).send("Error while finding all users from database:", err);
    }
});
app.post("/signup", )

const port = "8000";
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});