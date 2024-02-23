const express = require('express');
const mongoose =  require('mongoose');
const app = express();

function validateEmail(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: {
        type: String,
        required: true,
        validate: [
            {
                validator: validateEmail,
                message: 'This email is invalid',
                type: 'email-validation-error-1'
            },
        ]
    }
});
const User = mongoose.model("User", userSchema);

async function connectToMongoDB() {
    await mongoose.connect(
        'mongodb://127.0.0.1:27017/Task19_Run1'
    ).then(() => {
        console.log('Database connection successful');
    }).catch((err) => {
        console.error('Database connection failed', err);
    });
}

async function addUserWithValidation(user) {
    // Your implementation here
    try {
        const newUser = new User(user);
        await newUser.save();

        console.log("User added successfully", user);
    } catch(err) {
        console.error("Error while adding user to database:", err.message);
    }
}

function addUsers() {
    let user1 = {
        username: `Aman_Clone_1`,
        email: `amancloned1@email.com`
    };
    addUserWithValidation(user1);

    let invalid_user1 = {
        username: `Aman_Clone_Invalid_1`,
        email: `Invalid_Email`
    };
    addUserWithValidation(invalid_user1);
    let invalid_user2 = {
        username: `Aman_Clone_Invalid_2`,
        email: `Invalid@Email`
    };
    addUserWithValidation(invalid_user2);
}

async function main() {
    await connectToMongoDB();
    addUsers();
    console.log("This happened");

}

main();