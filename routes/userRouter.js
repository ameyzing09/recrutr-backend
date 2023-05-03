import { createLogin, userLogin } from "../controller/user.controller.js";

import { Router } from "express";
import userValidation from "../middleware/validations/userValidations.js";
import requestValidation from "../middleware/validations/requestValidations.js";

const router = Router();

router.post("/signup", userValidation.createUserValidation, requestValidation, createLogin);

router.post("/login", userValidation.loginRequestBody, requestValidation, userLogin);

// router.get('/logout', logout)

export default router;
