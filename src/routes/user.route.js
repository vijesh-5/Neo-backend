import { Router } from "express";
import { loginUser, registerUser , logoutUser, deleteUser, updateUser, getUserdetails} from "../controllers/user.controller.js";
const router = Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/delete/:id").delete(deleteUser);
router.route("/update-user/:id").patch(updateUser);
router.route("/u/:username").get(getUserdetails)
export default router;
