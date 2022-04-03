import express from "express";
import { createProduct, deleteProduct, editProduct, getAllProducts, getProduct } from "../controllers/productController.js";
import { verifyTokenAndAdmin } from "../middleware/authMiddleware.js";



const router = express.Router()

router.post('/', verifyTokenAndAdmin, createProduct)
router.put('/edit/:id', verifyTokenAndAdmin, editProduct)
router.delete('/delete/:id', deleteProduct)
router.get('/find/:id', getProduct)
router.get('/findAll', getAllProducts)


export default router