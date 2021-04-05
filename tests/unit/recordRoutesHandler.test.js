const recordRoutesHandler = require("../../handlers/recordRoutes");

const req = {
    body: {
        "startDate": "2016-02-28", 
        "endDate": "2019-03-02", 
        "minCount": 2700, 
        "maxCount": 2800 
    }
}

const recs = [
    {
        "totalCount": 2718,
        "key": "HJGWkdmD",
        "createdAt": "2016-06-08T13:28:10.965Z"
    },
    {
        "totalCount": 2772,
        "key": "pxClAvll",
        "createdAt": "2016-12-19T10:00:40.050Z"
    },
    {
        "totalCount": 2759,
        "key": "cUZMtDFd",
        "createdAt": "2016-08-22T07:54:11.729Z"
    },
    {
        "totalCount": 2730,
        "key": "zZBGKskQ",
        "createdAt": "2016-06-30T01:39:35.456Z"
    }
]

describe("Unit test of the record route handler", () => {
    it("should return records", async() => {
        recordRoutesHandler.fetchDataFromDB = jest.fn(() => Promise.resolve(recs));

        const result = await recordRoutesHandler.fetchData(req);

        expect(result.length).toBe(4);
        expect(result).toBeInstanceOf(Array);
    });

});