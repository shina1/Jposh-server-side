import express from "express";

import { verifyToken } from "../middleware/authMiddleware.js";
import { createBlog, createPostRules, deleteABlog, editPostRules, getAllBlogPosts, getBlogPostById, updatePostHandler } from "../controllers/blogController.js";


const router = express.Router()

router.post('/create', createPostRules, createBlog);
router.put('/article/update/:id',verifyToken, editPostRules, updatePostHandler)
router.get('/article/:id', getBlogPostById);
router.get('/articles', getAllBlogPosts);
router.delete('/article/delete/:id', deleteABlog)

export default router