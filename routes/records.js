const express = require("express");
const {validationResult} = require('express-validator')
const recordRoutesHandler = require("../handlers/recordRoutes");
const {
    validateStartDate, 
    validateEndDate, 
    validateDate, 
} = require("./../validator/validator");

const routes = express.Router({
    mergeParams: true
});

routes.post("/", [validateStartDate, validateEndDate, validateDate], async (req, res) => {
    try {
        let jsonObj = {}
       
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            let errs = errors.array();
            let errorMsgs = [];
            errs.forEach((err) => {
                errorMsgs.push(err.msg)
            })

            jsonObj = {
                code: 1,
                message: errorMsgs,
                records: []
            }
            
            return res.status(400).send(jsonObj)
        }
        
        const result = await recordRoutesHandler.fetchData(req);
        console.log("result");
        jsonObj = {
            code: 0,
            message: "Success",
            records: result
        }
        

        return res.json(jsonObj);
    } catch(err) {
        const jsonObj = {
            code: 2,
            message: err.message
        }
        return res.status(500).send(jsonObj);
    }
    
})

module.exports = {
    routes
};