const User = require('./models');
const mongoose = require('mongoose');

async function connectToMongoDB() {
    await mongoose.connect(
        'mongodb://127.0.0.1:27017/Task19_Run1'
    ).then(() => {
        console.log('Database connection successful');
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

module.exports = {
    addUserToDatabase,
    connectToMongoDB
};