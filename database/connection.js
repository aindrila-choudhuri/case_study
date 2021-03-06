const {MongoClient} = require('mongodb');

// for local configs
// const configs = require("./../config/config")
// const mongoURI = process.env.MONGO_URI || configs.mongodb.dbURI

// kept it global for api integration test
global._db = "";

const mongoURI = process.env.MONGO_URI;

const connectDB = async () => {
    const client = new MongoClient(mongoURI+"?retryWrites=true", { useUnifiedTopology: true });
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        global._db  = client.db('getir-case-study');
    } catch (e) {
        console.error(e);
    }
};

const getDB = function() {
    return _db;
}

const closeDB = async () => {
    await client.close();
 }

module.exports = {connectDB, closeDB, getDB};

