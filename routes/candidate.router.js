import { Router } from "express";

import verifyToken from "../middleware/verifyToken.js";

import {
  createCandidate,
  deleteCandidate,
  getCandidateById,
  getCandidatesByPage,
  modifyCandidate,
} from "../controller/candidate.controller.js";

const router = Router();

router.get("/", verifyToken, getCandidatesByPage);

router.get("/:candidateId", verifyToken, getCandidateById);

router.post("/", verifyToken, createCandidate);

router.put("/:candidateId", verifyToken, modifyCandidate);

router.delete("/:candidateId", verifyToken, deleteCandidate);

export default router;
