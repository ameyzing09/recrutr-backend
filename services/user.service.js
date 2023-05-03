import { hash } from "bcrypt";

import authUtils from '../utils/authUtils.js';

import { HTTP_ERRORS, ERROR_MESSAGES } from "../constants/apiContants.js";

import {
  fetchOne as fetchUserDetails,
  create as addUserDetails,
} from "../db/methods/user.method.js";
import useLogger from "../lib/logger.js";

const logger = useLogger("user.service.js");

const createUser = async (newUserDetails) => {
  try {
    const { name, username, password, role } = newUserDetails;
    const existingUser = await fetchUserDetails({
      where: { username },
      raw: true,
    });
    if (existingUser) {
      logger.info(`User ${username} already exists`);
      throw {
        code: HTTP_ERRORS.CONFLICT,
        message: ERROR_MESSAGES.USER_ALREADY_EXISTS,
      };
    }

    const hashPassword = await hash(password, 10);

    const createdUser = await addUserDetails({
      name,
      username,
      password: hashPassword,
      is_sso_user: false,
      role,
      status: "ACTIVE",
    });

    const token = authUtils.generateAuthToken({ id: createdUser.id, username: createdUser.username, userRole: createdUser.role });
    logger.info(`User ${JSON.stringify(createdUser)} created`);
    return { createdUser, token };
  } catch (err) {
    logger.error("Error occurred while adding user", JSON.stringify(err));
    throw {
      code: err.code || HTTP_ERRORS.INTERNAL_SERVER_ERROR,
      message: err.message || ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    };
  }
};

const loginUser = async (loginCreds) => {
  try {
    console.info('In loginUser() ');
    const { username, password } = loginCreds;
    const existingUser = await fetchUserDetails({
      where: { username },
      raw: true,
    });
    if (!existingUser) {
      logger.info(`User not found ${username}`);
      throw {
        code: HTTP_ERRORS.NOT_FOUND,
        message: ERROR_MESSAGES.USER_NOT_FOUND,
      };
    }
    const verifyPassword = await authUtils.compareAuthCreds(password, existingUser.password);
    if (!verifyPassword) {
      logger.info('Invalid password');
      throw {
        code: HTTP_ERRORS.BAD_REQUEST,
        message: ERROR_MESSAGES.INVALID_CREDENTIALS,
      };
    }
    const token = authUtils.generateAuthToken({ id: existingUser.id, username: existingUser.username, userRole: existingUser.role });
    logger.info(
      `User login successful ${JSON.stringify(existingUser)} and token ${token}`
    );
    return { user: existingUser, token };
  } catch (err) {
    logger.error("Error logging in : ", JSON.stringify(err));
    throw {
      code: HTTP_ERRORS.INTERNAL_SERVER_ERROR,
      message: err.message || ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    };
  }
};

export default { createUser, loginUser };
