const {MongoClient} = require('mongodb');
const configs = require("./../config/config")
let _db;

const connectDB = async () => {
    const client = new MongoClient(configs.mongodb.dbURI, { useUnifiedTopology: true });
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        _db  = client.db('getir-case-study');

        //await  listDatabases(client);
    } catch (e) {
        console.error(e);
    }
};

const getDB = function() {
    return _db;
}

// async function listDatabases(client){
//     databasesList = await client.db().listCollections().toArray();
 
//     console.log("Databases:", databasesList);
//     // databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };

const closeDB = async () => {
    await client.close();
 }

module.exports = {connectDB, closeDB, getDB};

