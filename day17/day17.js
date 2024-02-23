const express = require('express');
const User =  require('./model');
const app = express();

function addUserToDatabase(user) {
    try {
        const newUser = new User(user);
        newUser.save();

        console.log("User added successfully", user);
    } catch(err) {
        console.error("Error while adding user to database:", err);
    }
}

let user1 = {
    username: "Aman1",
    email: "aman@email.com"
}

addUserToDatabase(user1);