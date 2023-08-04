const { validationResult } = require('express-validator');

//  Middleware formatting errors from express-validator middleware
//  handleValidationErrors calls validationResult from express-validator package
//  passing in the req. If !validationErrors returned from validationResult() next(err)
//  If validation errors exist, create error w/ validation error messages
const handleValidationErrors = (req, _res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const errors = {};
        validationErrors.array().forEach(error => errors[error.path] = error.msg);

        const err = Error("Bad request.");
        err.errors = errors;
        err.status = 400;
        err.title = "Bad request.";
        next(err);
    }
    next();
}




module.exports = { handleValidationErrors };
