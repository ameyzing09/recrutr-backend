import useLogger from "../lib/logger.js";

import { ERROR_MESSAGES, HTTP_ERRORS } from "../constants/apiContants.js";

import candidateService from "../services/candidate.service.js";
import StandardResponse from "../routes/standardResponse.js";

const response = new StandardResponse();

const logger = useLogger("candidate.controller.js");

const getCandidateById = async (req, res) => {
  try {
    const candidateDetails = await candidateService.getCandidateById(
      req.params.candidateId
    );
    response.sendSuccessResponse(res, candidateDetails);
  } catch (err) {
    logger.error("Error occurred while fetching candidate : ", JSON.stringify(err));
    if (err.code === HTTP_ERRORS.NOT_FOUND) {
      response.sendErrorResponse(res, err.code, err.message);
    }
  }
};

const getCandidatesByPage = async (req, res) => {
  try {
    const { limit, page } = req.query;
    const { candidateDetails, totalPages, totalCandidates } =
      await candidateService.getCandidatesByPage(limit, page);
    response.sendSuccessResponse(res, {
      candidateDetails,
      totalPages,
      totalCandidates,
    });
  } catch (err) {
    logger.error("Error occurred while fetching candidate : ", err);
    response.sendErrorResponse(res, err.code, err.message);
  }
};

const createCandidate = async (req, res) => {
  try {
    const candidateDetails = await candidateService.createCandidate(req);
    response.sendSuccessResponse(res, {
      candidateId: candidateDetails.id,
    });
  } catch (err) {
    logger.error("Error occurred while adding candidate : ", err);
    if (err.code === HTTP_ERRORS.CONFLICT) {
      response.sendErrorResponse(res, err.code, err.message);
    }
    response.sendErrorResponse(
      res,
      HTTP_ERRORS.INTERNAL_SERVER_ERROR,
      ERROR_MESSAGES.INTERNAL_SERVER_ERROR
    );
  }
};

const modifyCandidate = async (req, res) => {
  try {
    const updatedCandidate = await candidateService.modifyCandidate(req);
    response.sendSuccessResponse(res, { updatedCandidate });
  } catch (err) {
    logger.error("Error occurred while updating candidate : ", err);
    if (err.code === HTTP_ERRORS.NOT_FOUND) {
      response.sendErrorResponse(res, err.code, err.message);
    } else if (err.code === HTTP_ERRORS.INTERNAL_SERVER_ERROR) {
      response.sendErrorResponse(res, err.code, err.message);
    }
  }
};

const deleteCandidate = async (req, res) => {
  try {
    const deletedCandidate = await candidateService.deleteCandidate(
      req.params.candidateId
    );
    response.sendSuccessResponse(res, { deletedCandidate });
  } catch (err) {
    logger.error("Error while deleting candidate : ", err.code);
    response.sendErrorResponse(res, err.code, err.message);
  }
};

export {
  getCandidateById,
  getCandidatesByPage,
  createCandidate,
  modifyCandidate,
  deleteCandidate,
};
