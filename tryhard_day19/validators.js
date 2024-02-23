const { validator } = require('express-validator');
const { check, oneOf } = require('express-validator/check');


const validation = [
    oneOf([
        check('nickname')
          .exists()
          .withMessage('nickname is required')
          .isLength({ min: 3 })
          .withMessage('wrong nickname length'),

        // check('nickname')
        //   .exists()
        //   .withMessage('nickname is required')
        //   .isEmail()
        //   .withMessage('nickname not valid'),
    ]),
    check('password')
        .exists()
        .withMessage('password is required')
];


router
  .post('/', validation, handleValidationErrors,
    (req, res) => {
      const isEmail = validator.isEmail(req.body.nickname);

      res.status(200).json({ isEmail });
    });
