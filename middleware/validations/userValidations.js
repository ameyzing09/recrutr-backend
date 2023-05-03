import { body } from "express-validator";

const userValidation = {
  createUserValidation: [
    body("name", "INVALID_REQUEST_DATA")
      .exists({ checkFalsy: true })
      .withMessage("Name is required")
      .isString()
      .withMessage("Name must be a string")
      .escape(),
    body("username", "INVALID_REQUEST_DATA")
      .exists({ checkFalsy: true })
      .isString()
      .withMessage("Username must be a string")
      .escape(),
    body("password", "INVALID_REQUEST_DATA")
      .exists({ checkFalsy: true })
      .withMessage("Password is required")
      .isString()
      .withMessage("Password must be a string")
      .escape(),
    body("status", "INVALID_REQUEST_DATA")
      .exists({ checkFalsy: true })
      .withMessage("Status is required")
      .isIn(["ACTIVE", "INACTIVE"])
      .withMessage("Status must be 'ACTIVE' or 'INACTIVE'")
      .escape(),
    body("role", "INVALID_REQUEST_DATA")
      .exists({ checkFalsy: true })
      .withMessage("Role is required")
      .isIn(["ADMIN", "USER", "HR"])
      .withMessage("Role must be 'ADMIN', 'USER', or 'HR'")
      .escape(),
  ],
  loginRequestBody: [
    body("username", "INVALID_REQUEST_DATA")
      .exists({ checkFalsy: true })
      .escape(),
    body("password", "INVALID_REQUEST_DATA")
      .exists({ checkFalsy: true })
      .escape(),
  ],
};

export default userValidation;
