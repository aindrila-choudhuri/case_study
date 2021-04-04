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

    // it("should return empty validation object", () => {
    //     const reqObj = {
    //         body: {
    //             "startDate": "2016-02-28", 
    //             "endDate": "2019-03-02", 
    //             "minCount": 2700, 
    //             "maxCount": 2800 
    //         }
    //     }
    //     const result = recordRoutesHandler.getValidationResult(reqObj);
    //     expect(Object.keys(result).length).toBe(0);
    //     expect(result).toBeInstanceOf(Object);
    // });

    // // it("should return validation object with values", () => {
    // //     const req = {
    // //         body: {
    // //             "startDate": "20161-02-28", 
    // //             "endDate": "2019-03-02", 
    // //             "minCount": 2700, 
    // //             "maxCount": 2800 
    // //         }
    // //     }
    // //     //recordRoutesHandler.fetchDataFromDB = jest.fn(() => Promise.resolve(recs));

    // //     const result = recordRoutesHandler.getValidationResult(req);
    // //     console.log("=====result1====", result);
    // //     expect(4).toBe(4);
    // //     //expect(Object.keys(result).length).toBe(0);
    // //     //expect(result).toBeInstanceOf(Object);
    // //     // if (Object.keys(jsonObj).length !== 0 && jsonObj.constructor === Object) {
    // //     //     return res.status(400).send(jsonObj)
    // //     // }
    // //     //expect(result).toBeInstanceOf(Array);
    // // })
});