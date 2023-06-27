import { Router } from "express";

import verifyToken from "../middleware/verifyToken.js";

import {
  createCandidate,
  deleteCandidate,
  getCandidateById,
  getCandidatesByPage,
  modifyCandidate,
} from "../controller/candidate.controller.js";
import candidateValidation from "../middleware/validations/candidateValidations.js";
import requestValidation from "../middleware/validations/requestValidations.js";

const router = Router();

router.get("/", verifyToken, getCandidatesByPage);

router.get(
  "/:candidateId",
  verifyToken,
  candidateValidation.getCandidateIdQuery,
  requestValidation,
  getCandidateById
);

router.post(
  "/",
  verifyToken,
  candidateValidation.createCandidateBody,
  requestValidation,
  createCandidate
);

router.put(
  "/:candidateId",
  verifyToken,
  [
    candidateValidation.getCandidateIdQuery,
    requestValidation,
    candidateValidation.modifyCandidateBody,
    requestValidation,
  ],
  modifyCandidate
);

router.delete("/:candidateId", verifyToken, deleteCandidate);

export default router;
