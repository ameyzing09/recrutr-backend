import useLogger from "../lib/logger.js";

import {
  fetchOne as fetchOneCandidateDetails,
  update as updateCandidateDetails,
  create as addCandidateDetails,
  fetchAndCountAll as fetchAllCandidatesWithPagination,
  erase as deleteCandidateDetails,
} from "../db/methods/candidateInfoMethod.js";
import { ERROR_MESSAGES, HTTP_ERRORS } from "../constants/apiContants.js";

const logger = useLogger("candidate.service.js");

const getCandidateById = async ({candidateId, userId}) => {
  try {
    const candidateDetails = await fetchOneCandidateDetails({
      where: {
        id: candidateId,
        user_id: userId
      },
      raw: true,
    });
    if (!candidateDetails) {
      logger.info(`Candidate with id ${candidateId} not found`);
      throw {
        code: HTTP_ERRORS.NOT_FOUND,
        message: ERROR_MESSAGES.CANDIDATE_NOT_FOUND,
      };
    }
    return candidateDetails;
  } catch (err) {
    logger.error(`Error while fetching candidate with id ${candidateId} `, err);
    throw {
      code: err.code || HTTP_ERRORS.INTERNAL_SERVER_ERROR,
      message: err.message || ERROR_MESSAGES.FAILED_TO_FETCH_CANDIDATE_DETAILS,
    };
  }
};

/**
 *
 * @param {number} limit
 * @param {number} page
 * @param {Object} candidateDetails
 */

const getCandidatesByPage = async (userId, limit = 10, page = 1) => {
  try {
    if (typeof limit !== "number" || limit <= 0) {
      throw {
        code: HTTP_ERRORS.BAD_REQUEST,
        message: ERROR_MESSAGES.INVALID_LIMIT,
      };
    }
    if (typeof page !== "number" || page <= 0) {
      throw {
        code: HTTP_ERRORS.BAD_REQUEST,
        message: ERROR_MESSAGES.INVALID_PAGE,
      };
    }
    const offset = (page - 1) * limit;
    const { count, rows } = await fetchAllCandidatesWithPagination({
      where: {
        user_id: userId,
      },
      limit,
      offset,
      order: [["candidate_name", "ASC"]],
      raw: true,
    });
    const totalPages = Math.ceil(count / limit);
    logger.info(
      `Candidate details fetched succesfully with total pages ${totalPages}`
    );
    return { candidateDetails: rows, totalPages, totalCandidates: count };
  } catch (err) {
    logger.error("Error occurred while fetch candidate info : ", err);
    throw {
      code: err.code || HTTP_ERRORS.INTERNAL_SERVER_ERROR,
      message: err.message || ERROR_MESSAGES.FAILED_TO_FETCH_CANDIDATE_DETAILS,
    };
  }
};

/**
 *
 * @param {object} candidateDetails
 * {
 *      "userId": Integer,
 *      "candidate_name": String,
 *      "candidate_gender": String
 *      "candidate_education": String
 *      "candidate_dob": Date,
 *      "candidate_experience": float,
 *      "candidate_resume": blob,
 * }
 *
 */

const createCandidate = async (req) => {
  try {
    console.log("Request Body : ", req.body);
    const {
      userId,
      candidateName,
      candidateGender,
      candidateDob,
      candidateEducation,
      candidateExperience,
      candidateResume,
    } = req.body;
    const existingCandidate = await fetchOneCandidateDetails({
      where: {
        candidate_name: candidateName,
        // candidate_dob: candidateDob,
      },
      raw: true,
    });
    if (existingCandidate) {
      logger.info(`Candidate ${candidateName} already exists`);
      throw {
        code: HTTP_ERRORS.CONFLICT,
        message: ERROR_MESSAGES.CANDIDATE_ALREADY_EXISTS,
      };
    }

    const createdCandidate = await addCandidateDetails({
      user_id: userId,
      candidate_name: candidateName,
      candidate_gender: candidateGender,
      // candidateDob,
      candidate_education: candidateEducation,
      candidate_experience: candidateExperience,
      // candidateResume,
    });

    logger.info(`Candidate ${JSON.stringify(createdCandidate)} created`);
    return createdCandidate;
  } catch (err) {
    logger.error("Error occurred while creating candidate info : ", err);
    throw {
      code: err.code || HTTP_ERRORS.INTERNAL_SERVER_ERROR,
      message: err.message || ERROR_MESSAGES.FAILED_TO_CREATE_CANDIDATE,
    }
  }
};

const modifyCandidate = async (req) => {
  try {
    const candidateId = req.params.candidateId;
    const {
      userId,
      candidateName,
      candidateGender,
      candidateDob,
      candidateEducation,
      candidateExperience,
      candidateResume,
    } = req.body;

    const candidateDetails = await fetchOneCandidateDetails({
      where: { id: candidateId },
      raw: true,
    });
    if (!candidateDetails) {
      logger.error(`Candidate ${candidateName} doesn't exists`);
      throw {
        code: HTTP_ERRORS.NOT_FOUND,
        message: ERROR_MESSAGES.CANDIDATE_NOT_FOUND,
      };
    }

    const updatedCandidateInfoRow = await updateCandidateDetails(
      {
        user_id: userId,
        candidate_name: candidateName,
        candidate_gender: candidateGender,
        // candidateDob,
        candidate_education: candidateEducation,
        candidate_experience: candidateExperience,
        // candidateResume,
      },
      {
        where: {
          id: candidateId,
        },
        returning: true,
      }
    );

    if (updatedCandidateInfoRow[1] > 0) {
      logger.info(`Candidate with ${candidateId} updated successfully`);
      return updatedCandidateInfoRow[1];
    } else {
      throw {
        code: HTTP_ERRORS.INTERNAL_SERVER_ERROR,
        message: ERROR_MESSAGES.FAILED_TO_UPDATE_CANDIDATE_DETAILS,
      };
    }
  } catch (err) {
    logger.error("Error occurred while updating candidate info : ", err);
    throw {
      code: err.code || HTTP_ERRORS.INTERNAL_SERVER_ERROR,
        message: err.message || ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    };
  }
};

const deleteCandidate = async (candidateId) => {
  try {
    const deletedCandidate = await deleteCandidateDetails({
      where: {
        id: candidateId,
      },
    });
    if(deletedCandidate <= 0) {
      throw {
        code: HTTP_ERRORS.NOT_FOUND,
        message: ERROR_MESSAGES.CANDIDATE_DOES_NOT_EXISTS,
      };
    }
    return deletedCandidate;
  } catch (err) {
    logger.error(`Error while deleting the candidate with id ${candidateId} `, JSON.stringify(err));
    throw {
      code : err.code || HTTP_ERRORS.INTERNAL_SERVER_ERROR,
      message: err.message || ERROR_MESSAGES.INTERNAL_SERVER_ERROR
    };
  }
};

export default {
  getCandidateById,
  getCandidatesByPage,
  createCandidate,
  modifyCandidate,
  deleteCandidate,
};
