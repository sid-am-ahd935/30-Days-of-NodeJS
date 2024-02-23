// MongoDB connection via mongoose
const mongoose = require("mongoose");

const server = '127.0.0.1:27017';
const database = 'Task17'; // Created
class Database {
  constructor() {
    this._connect();
  }
  _connect() {
    mongoose
      .connect(`mongodb://${server}/${database}`)
      .then(() => {
        console.log('Database connection successful');
      })
      .catch((err) => {
        console.error('Database connection failed');
      });
  }
}

module.exports = new Database();