import StandardResponse from "../routes/standardResponse.js";

import { HTTP_ERRORS, ERROR_MESSAGES } from "../constants/apiContants.js";
import { DB_STATUS } from "../constants/commonConstants.js";
import useLogger from "../lib/logger.js";
import authUtils from "../utils/authUtils.js";

import { fetchOne as fetchOneUserDetails } from "../db/methods/userMethod.js";

const logger = useLogger("verifyToken.js");

const response = new StandardResponse();

const validate = async (req, token) => {
    const tokenPayload = authUtils.verifyAuthToken(token);
    if (tokenPayload) {
        const user = await fetchOneUserDetails({
            where: {
                id: tokenPayload.id,
                status: DB_STATUS.ACTIVE,
            },
            raw: true,
        });

        if (!user) {
            logger.debug(`User with userId ${tokenPayload.userId} not found!`);
            throw new Error(`User with userId ${tokenPayload.userId} not found!`);
        }
        req.userInfo = user;
        req.tokenExpiryTs = tokenPayload.exp;
    }
};

const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || req.headers.Authorization;
        if (!authHeader) {
            throw new Error("Missing auth token");
        }
        if (!authHeader?.startsWith("Bearer ")) {
            logger.error("Token not found");
            return response.sendErrorResponse(
                res,
                HTTP_ERRORS.UNAUTHORIZED,
                ERROR_MESSAGES.UNAUTHORIZED
            );
        }
        const token = authHeader.split(" ")[1];
        logger.info("Verifying token....");
        await validate(req, token);
        next();
    } catch (err) {
        logger.error(
            `Error in verifying user token ${req.headers.authorization?.split(" ")[1] || ""
            }:`,
            err
        );
        response.sendErrorResponse(
            res,
            HTTP_ERRORS.UNAUTHORIZED,
            ERROR_MESSAGES.UNAUTHORIZED
        );
    }
};

export default verifyToken;
