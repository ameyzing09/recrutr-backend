import useLogger from "../lib/logger.js";

import {
  fetchOne as fetchOneCandidateDetail,
  fetchAll as fetchAllCandidateDetails,
  create as addCandidateDetails,
} from "../db/methods/candidateInfo.method.js";
import StandardResponse from "../routes/standardResponse.js";
import { ERROR_MESSAGES, HTTP_ERRORS } from "../constants/apiContants.js";

const response = new StandardResponse();

const logger = useLogger("candidate.service.js");

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

const createCandidateInfo = async (req) => {
  const {
    userId,
    candidateName,
    candidateGender,
    candidateDob,
    candidateEducation,
    candidateExperience,
    candidateResume,
  } = req.body;
  try {
    const existingCandidate = fetchOneCandidateDetail({
      where: {
        candidate_name: candidateName,
        candidate_dob: candidateDob,
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
      userId,
      candidateName,
      candidateGender,
      candidateDob,
      candidateEducation,
      candidateExperience,
      candidateResume,
    });

    logger.info(`Candidate ${JSON.stringify(createdCandidate)} created`);
    return createdCandidate;
  } catch (err) {
    logger.error(
      "Error occurred while creating candidate : ",
      JSON.stringify(err)
    );
    throw err;
  }
};

export default { createCandidateInfo };
