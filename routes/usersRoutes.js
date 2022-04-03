import express from "express";
import { authUsers, createUser, deleteUser, getUserProfile, updateUserProfile } from "../controllers/userController.js";
import { shield, verifyTokenAndAdmin } from "../middleware/authMiddleware.js";

const router = express.Router()
router.route('/').post(createUser)
router.route('/login').post(authUsers)
router.route('/profile/:id').get(shield ,getUserProfile)
router.route('/update/:id').put(shield, updateUserProfile)
router.route('delete/:id').delete(verifyTokenAndAdmin, deleteUser)





export default router