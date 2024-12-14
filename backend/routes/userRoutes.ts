import { Router } from "express";
import { getUserByID, updateUserHeightWeight, updateUserPassword, updateUserUsername } from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";
const router = Router();

router.get("/user", authMiddleware, getUserByID);
router.put("/editUser/password", authMiddleware, updateUserPassword);
router.put("/editUser/username", authMiddleware, updateUserUsername);
router.put("/editUser/heightWeight", authMiddleware, updateUserHeightWeight);

export default router;