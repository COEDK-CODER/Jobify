import { Router } from "express";
import {register,login,logout} from '../controllers/authController.js'
import {validateUserInput,validateUserLoginInput} from '../middlewares/validationMiddleware.js'

const authRouter=Router();

authRouter.route("/login").post(validateUserLoginInput,login);
authRouter.route("/register").post(validateUserInput,register);
authRouter.route("/logout").get(logout);
export default authRouter;