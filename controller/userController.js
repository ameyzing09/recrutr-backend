const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  HTTP_ERRORS,
  ERROR_MESSAGES,
  HTTP_SUCCESS,
} = require("../constants/apiContants");

const userModel = require("../db/models/user");
const logger = require("../lib/logger")("userController.js");
const StandardResponse = require("../routes/StandardResponse");

const response = new StandardResponse();

const createLogin = async (req, res) => {
  // Exists or not
  const { name, username, password, role } = req.body;
  try {
    const existingUser = await userModel.findOne({
      where: { username },
      raw: true,
    });
    if (existingUser) {
      logger.info(`User ${username} already exists`)
      return response.sendErrorResponse(
        res,
        HTTP_ERRORS.BAD_REQUEST,
        ERROR_MESSAGES.USER_ALREADY_EXISTS
      );
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const result = await userModel.create({
      name,
      username,
      password: hashPassword,
      is_sso_user: false,
      role,
      status: "ACTIVE",
    });

    const token = jwt.sign(
      { id: result.id, username: result.username },
      process.env.JWT_TOKEN_SECRET_KEY
    );
    logger.info(`User ${JSON.stringify(result)} created`)
    response.sendSuccessResponse(res, { user: result, token });
  } catch (error) {
    logger.error("Error occurred while creating user : ", error);
    response.sendErrorResponse(
      res,
      HTTP_ERRORS.INTERNAL_SERVER_ERROR,
      ERROR_MESSAGES.INTERNAL_SERVER_ERROR
    );
  }
};

const login = async (req, res) => {
  try {
    
    const { username, password } = req.body;
    const existingUser = await userModel.findOne({ where: { username }, raw: true });
    if (!existingUser) {
      logger.error("User not found ");
      return response.sendErrorResponse(
        res,
        HTTP_ERRORS.NOT_FOUND,
        ERROR_MESSAGES.USER_NOT_FOUND
      );
    }
    console.log("exisiting user ", existingUser)
    const verifyPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!verifyPassword) {
      logger.error("Invalid password");
      return response.sendErrorResponse(
        res,
        HTTP_ERRORS.BAD_REQUEST,
        ERROR_MESSAGES.INVALID_CREDENTIALS
      );
    }
    const token = jwt.sign(
      { id: existingUser.id, username: existingUser.username },
      process.env.JWT_TOKEN_SECRET_KEY
    );
    logger.info(`User login successful ${JSON.stringify(existingUser)} and token ${token}`);
    return response.sendSuccessResponse(res, { user: existingUser, token });
  } catch (error) {
    logger.error("Error logging in : ", error);
    return response.sendErrorResponse(
      res,
      HTTP_ERRORS.INTERNAL_SERVER_ERROR,
      ERROR_MESSAGES.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = { login, createLogin };
