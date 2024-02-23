const Schema = require('mongoose').Schema;
const model = require('mongoose').model;
const database = require('./database');

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true }
});

const User = model("User", userSchema);

module.exports = User;