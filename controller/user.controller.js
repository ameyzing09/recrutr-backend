import StandardResponse from "../routes/standardResponse.js";

import userService from "../services/user.service.js";

const response = new StandardResponse();

const createLogin = async (req, res) => {
  try {
    const { createdUser, token } = await userService.createUser(req.body);
    response.sendSuccessResponse(res, { user: createdUser, token });
  } catch (err) {
    response.sendErrorResponse(res, err.code, err.message);
  }
};

const userLogin = async (req, res) => {
  try {
    const { token } = await userService.loginUser(req.body);
    response.sendSuccessResponse(res, { token });
  } catch (err) {
    console.log(err);
    response.sendErrorResponse(res, err.code, err.message);
  }
};

export { userLogin, createLogin };
