const {check} = require('express-validator');

module.exports = {
    validateStartDateRequired: check('startDate').exists().withMessage('Start date is required'),
    validateEndDateRequired: check('endDate').exists().withMessage('End date is required'),
    validateMinCountRequired: check('minCount').exists().withMessage('Min count is required'),
    validateMaxCountRequired: check('maxCount').exists().withMessage('Max count is required'),
    validateMinCount: check('minCount').isDecimal().withMessage('Min count must be a number'),
    validateMaxCount: check('maxCount').isDecimal().withMessage('Max count must be a number'),
    validateMinCountLessThanMaxCount: check('minCount').custom((minCount, { req }) => {
        if (minCount >= req.body.maxCount) {
            throw new Error('Min count must be less than max count')
        }
        return true
    }),
    validateStartDate : check('startDate').trim().isDate().withMessage('Must be a valid start date'),
    validateEndDate : check('endDate').trim().isDate().withMessage('Must be a valid end date'),
    validateStartDateLessThanEndDate: check('startDate').trim().custom((sdate, { req }) => {
            // Fetch year, month and day of respective dates 
            const [sy, sm, sd] = sdate.split('-');
            const [ey, em, ed] = req.body.endDate.split('-');

            // Constructing dates from given string date input
            const startDate = new Date(sy, sm, sd);
            const endDate = new Date(ey, em, ed);

            // Validate start date so that it mustcomes before end date
            if (startDate >= endDate) {
                throw new Error('Start date must be before End date')
            }
            return true
        })
      
  }