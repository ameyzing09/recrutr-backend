import useLogger from "../lib/logger.js";

import { ERROR_MESSAGES, HTTP_ERRORS } from "../constants/apiContants.js";

import candidateService from "../services/candidate.service.js";
import StandardResponse from "../routes/standardResponse.js";

const response = new StandardResponse();

const logger = useLogger("candidate.controller.js");

const addCandidateInfo = async (req, res) => {
  try {
    const candidateDetails = await candidateService.createCandidateInfo(req);
    response.sendSuccessResponse(res, { candidateId: candidateDetails.id });
  } catch (err) {
    logger.error("Error occurred while adding candidate : ", err);
    if (err.code === HTTP_ERRORS.CONFLICT) {
      return response.sendErrorResponse(res, err.code, err.message);
    }
    return response.sendErrorResponse(
      err,
      HTTP_ERRORS.INTERNAL_SERVER_ERROR,
      ERROR_MESSAGES.INTERNAL_SERVER_ERROR
    );
  }
};

export default addCandidateInfo;
