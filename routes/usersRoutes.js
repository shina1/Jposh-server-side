import express from "express";
import { Router } from "express";
import { authUsers, createUser, getUserProfile, updateUserProfile } from "../controllers/userController.js";
import { shield } from "../middleware/authMiddleware.js";

const router = express.Router()
router.route('/').post(createUser)
router.route('/login').post(authUsers)
router.route('/profile').get(shield ,getUserProfile)
router.route('/update').put(shield, updateUserProfile)





export default router