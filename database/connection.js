const {MongoClient} = require('mongodb');
const configs = require("./../config/config")
// kept it global for api integration test
global._db = "";

const connectDB = async () => {
    const client = new MongoClient(configs.mongodb.dbURI, { useUnifiedTopology: true });
 
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

