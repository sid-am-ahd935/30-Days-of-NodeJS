const express = require('express');
const mongoose =  require('mongoose');
const app = express();

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number }
});
const User = mongoose.model("User", userSchema);

async function connectToMongoDB() {
    await mongoose.connect(
        'mongodb://127.0.0.1:27017/Task20_Run1'
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

async function averageAgeOfUsers(req, res) {
    try {
        const users = await User.find({});
        let n = 0, sum_n = 0;

        users.forEach(element => {
            sum_n += element.age;
            n++;
        });
        return res.status(200).json({
            status: 200,
            average: `${sum_n/n}`,
            message: `The average age of all users is ${sum_n/n}`
        });
    } catch(err) {
        res.status(500).send("Error while finding all users from database:", err);
    }
}

function addUsers(no_of_users = 5) {
    for(let i=1; i<=no_of_users; i++) {
        let user = {
            name: `Aman_Clone_${i}`,
            age: 18+i
        }
        addUserToDatabase(user);
    }
}

connectToMongoDB();
app.get("/avg", averageAgeOfUsers);

const port = "8000";
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});