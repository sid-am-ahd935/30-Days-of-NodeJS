const express = require('express');
const mongoose =  require('mongoose');
const app = express();

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true }
});
const User = mongoose.model("User", userSchema);

async function connectToMongoDB() {
    await mongoose.connect(
        'mongodb://127.0.0.1:27017/Task18_Run1'
    ).then(() => {
        console.log('Database connection successful');
        addUsers();
    }).catch((err) => {
        console.error('Database connection failed', err);
    });
}

async function addUserToDatabase(user) {
    try {
        const newUser = new User(user);
        await newUser.save();

        console.log("User added successfully", user);
    } catch(err) {
        console.error("Error while adding user to database:", err);
    }
}

async function getAllUsers(req, res) {
    try {
        const users = await User.find({});
        res.json(users);
    } catch(err) {
        res.status(500).send("Error while finding all users from database:", err);
    }
}

function addUsers(no_of_users = 5) {
    for(let i=1; i<=no_of_users; i++) {
        let user = {
            username: `Aman_Clone_${i}`,
            email: `amancloned${i}@email.com`
        }
        addUserToDatabase(user);
    }
}

connectToMongoDB();
app.get("/users", getAllUsers);

const port = "8000";
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});