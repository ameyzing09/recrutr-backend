import { Router } from "express";

import {
  createCandidate,
  deleteCandidate,
  getCandidateById,
  getCandidatesByPage,
  modifyCandidate,
} from "../controller/candidate.controller.js";

const router = Router();

router.get("/", getCandidatesByPage);

router.get("/:candidateId", getCandidateById);

router.post("/", createCandidate);

router.put("/:candidateId", modifyCandidate);

router.delete("/:candidateId", deleteCandidate);

export default router;
