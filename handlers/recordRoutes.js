const {getDB} = require("./../database/connection")

const recordRoutesHandler = {}

recordRoutesHandler.fetchData = async (req) => {
    const startDateToISOString = new Date(req.body.startDate).toISOString();
    const endDate = new Date(req.body.endDate);
    endDate.setDate(endDate.getDate() + 1);

    const endDateNextDateToISOString = endDate.toISOString();

    try {
        const res = await fetchDataFromDB(startDateToISOString, endDateNextDateToISOString, req.body.minCount, req.body.maxCount);
        return res;
    } catch(err) {
        throw new err;
    }
    
};

const fetchDataFromDB = async(startDateToISOString, endDateNextDateToISOString, minCount, maxCount) => {
    try {
        const db = getDB();

        const result = await db.collection("records").aggregate([
            {
               "$match": {
                    "$and": [
                        {"createdAt": {"$gt": new Date(startDateToISOString), "$lt": new Date(endDateNextDateToISOString)}}
                    ]
               },
            },
            {
                "$unwind": "$counts"
            },
            {
                "$group": {
                    "_id": {
                        "id": "$_id",
                        "key": "$key",
                        "createdAt": "$createdAt"
                    }, 
                    "totalCount": {
                        "$sum": "$counts"
                    }
                }
            },
            {
                "$match": {
                     "$and": [
                         {"totalCount": {"$gt": minCount, "$lt": maxCount}}
                     ]
                },
            },
            {
                "$project": {
                   "_id": 0,
                   "key": "$_id.key",
                   "createdAt": "$_id.createdAt",
                   "totalCount": 1
               }
            }
       ]).toArray();
    
       return result;
    } catch (err) {
        throw new Error ("Error happened in fetching data from database");
    }
}

module.exports = recordRoutesHandler;