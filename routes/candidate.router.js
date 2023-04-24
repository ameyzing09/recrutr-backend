import addCandidateInfo from "../controller/candidate.controller.js";

import { Router } from "express";
const router = Router();

router.post("/", addCandidateInfo);

// router.post("/signup", createLogin);

// router.get('/logout', logout)

export default router;
