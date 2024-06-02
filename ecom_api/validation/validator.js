const { validationResult, check } = require("express-validator");

//category validation
exports.categoryValidation = [
  check("category_name", "category is required")
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("category name must be minimum of 3 or more character"),
];

//product validation
exports.productValidation = [
  check("product_name", "product is required")
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("product name must be minimum of 3 or more character"),
  check("product_price", "price is required")
    .notEmpty()
    .isNumeric()
    .withMessage("Price should be a number"),
  check("countInStock", "stock is required")
    .notEmpty()
    .isNumeric()
    .withMessage("Stock must be numeric"),
  check("product_description", "description is required")
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("description must have morw information about product"),
  check("category", "category is required").notEmpty(),
];

//user validation
exports.userValidation = [
  check("name", "User name is required")
    .notEmpty()
    .isLength({ min: 2 })
    .withMessage("name must be minimum of 2 or more character"),
  check("email", "email is required")
    .notEmpty()
    .isEmail()
    .withMessage("Email format invalid"),
  check("password", "password is required")
    .notEmpty()
    .matches(/[a-z]/)
    .withMessage("Password must contain atleast one lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain atleast one uppercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain atleast one numeric value ")
    .matches(/[@#$._]/)
    .withMessage("Password must contain atleast one symbolic value ")
    .isLength({ min: 8 })
    .withMessage("Password must contain atleast 8 character "),
];
//password validation
exports.passwordValidation = [
  check("password", "password is required")
    .notEmpty()
    .matches(/[a-z]/)
    .withMessage("Password must contain atleast one lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain atleast one uppercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain atleast one numeric value ")
    .matches(/[@#$._]/)
    .withMessage("Password must contain atleast one symbolic value ")
    .isLength({ min: 8 })
    .withMessage("Password must contain atleast 8 character "),
];

//for validation error message
exports.validation = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
};
