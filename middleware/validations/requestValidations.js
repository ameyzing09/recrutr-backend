import { validationResult } from "express-validator";
import StandardResponse from "../../routes/standardResponse.js";
import useLogger from '../../lib/logger.js'
import { HTTP_ERRORS } from "../../constants/apiContants.js";

const logger = useLogger('requestValidation.js');

const requestValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.error(`Error in request validations ${JSON.stringify(errors)}`);
        const error = {
            code: 'BAD_REQUEST',
            message: errors,
        };

        const response = new StandardResponse();

        return response.sendErrorResponse(res, HTTP_ERRORS.BAD_REQUEST, error);
    }
    return next();
}
export default requestValidation;