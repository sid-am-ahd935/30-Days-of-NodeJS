const util = require('util');
const validationResult  = require('express-validator/check');


function handleValidationErrors(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(util.inspect(errors.array()));
      return res.status(422).json({ errors: errors.array() });
    }

    next();
};

module.exports = handleValidationErrors