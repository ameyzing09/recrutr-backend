import { createLogin, login } from "../controller/userController.js";

import { Router } from "express";
const router = Router();

router.post("/login", login);

router.post("/signup", createLogin);

// router.get('/logout', logout)

export default router;
