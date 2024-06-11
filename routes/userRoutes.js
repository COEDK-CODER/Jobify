import { Router } from "express";
import { getApplicationStats, getCurrentUser, updateUser } from "../controllers/userController.js";
import { validateUpdateUserInput } from "../middlewares/validationMiddleware.js";
import {authorizePermissions} from '../middlewares/authMiddleware.js'


const userRouter=Router();

userRouter.route("/current-user").get(getCurrentUser);
userRouter.route("/admin/app-stats").get(authorizePermissions("admin"),getApplicationStats);
userRouter.route("/update-user").patch(validateUpdateUserInput,updateUser);
export default userRouter;