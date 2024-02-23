const mongoose =  require('mongoose');

async function connectToMongoDB() {
    await mongoose.connect(
        'mongodb://127.0.0.1:27017/Task23_Run3'
    ).then(() => {
        console.log('Database connection successful');
    }).catch((err) => {
        console.error('Database connection failed', err);
    });
}

module.exports = connectToMongoDB;