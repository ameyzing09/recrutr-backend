import useLogger from "../lib/logger.js";


import candidateService from "../services/candidate.service.js";
import StandardResponse from "../routes/standardResponse.js";

const response = new StandardResponse();

const logger = useLogger("candidate.controller.js");

const getCandidateById = async (req, res) => {
  try {
    const candidateDetails = await candidateService.getCandidateById(
      {candidateId: req.params.candidateId, userId: req.userInfo.id}
    );
    response.sendSuccessResponse(res, candidateDetails);
  } catch (err) {
    logger.error(
      "Error occurred while fetching candidate : ",
      JSON.stringify(err)
    );
    response.sendErrorResponse(res, err.code, err.message);
  }
};

const getCandidatesByPage = async (req, res) => {
  try {
    const { limit, page } = req.query;
    const { candidateDetails, totalPages, totalCandidates } =
      await candidateService.getCandidatesByPage(req.userInfo.id, limit, page);
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
    response.sendErrorResponse(res, err.code, err.message);
  }
};

const modifyCandidate = async (req, res) => {
  try {
    const updatedCandidate = await candidateService.modifyCandidate(req);
    response.sendSuccessResponse(res, { updatedCandidate });
  } catch (err) {
    logger.error("Error occurred while updating candidate : ", err);
    response.sendErrorResponse(res, err.code, err.message);
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
