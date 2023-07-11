import { body, param } from "express-validator";

const candidateValidation = {
  createCandidateBody: [
    body("candidateName", "INVALID_REQUEST_DATA")
      .exists({ checkFalsy: true })
      .withMessage("Candidate name is required")
      .isString()
      .withMessage("Candidate name must be a string")
      .escape(),
    body("candidateGender", "INVALID_REQUEST_DATA")
      .exists({ checkFalsy: true })
      .isString()
      .withMessage("Candidate gender must be a string")
      .escape(),
    body("candidateEducation", "INVALID_REQUEST_DATA")
      .exists({ checkFalsy: true })
      .withMessage("Candidate education is required")
      .isString()
      .withMessage("Candidate education must be a string")
      .escape(),
    body("candidateExperience", "INVALID_REQUEST_DATA")
      .exists({ checkFalsy: true })
      .withMessage("Candidate experience is required")
      .escape()
  ],
  modifyCandidateBody: [
    body("candidateName", "INVALID_REQUEST_DATA")
      .exists({ checkFalsy: false })
      .withMessage("Candidate name is required")
      .isString()
      .withMessage("Candidate name must be a string")
      .escape(),
    body("candidateGender", "INVALID_REQUEST_DATA")
      .exists({ checkFalsy: false })
      .isString()
      .withMessage("Candidate gender must be a string")
      .escape(),
    body("candidateEducation", "INVALID_REQUEST_DATA")
      .exists({ checkFalsy: false })
      .withMessage("Candidate education is required")
      .isString()
      .withMessage("Candidate education must be a string")
      .escape(),
    body("candidateExperience", "INVALID_REQUEST_DATA")
      .exists({ checkFalsy: false })
      .withMessage("Candidate experience is required")
      .escape()
  ],
  getCandidateIdQuery : [
    param("candidateId", "INVALID_PARAM")
    .exists({ checkFalsy: true })
    .isInt()
    .withMessage("Candidate ID must be integer")
    .escape()
  ]
};

export default candidateValidation;
