import express from "express";
import { addOrderItems, deleteOrder, getAllOrder, getMonthlyIncome, getOrderById, getUserOrder, updateOrder, updateOrderToDelivered, updateOrderToPaid } from "../controllers/orderController.js";
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../middleware/authMiddleware.js";

const router = express.Router()

router.post('/', verifyToken, addOrderItems)
router.put("/update/:id", verifyTokenAndAdmin, updateOrder)
router.delete("/delete/:id", verifyTokenAndAdmin, deleteOrder)
router.get("/userorder/:userId", verifyTokenAndAuthorization
, getUserOrder)
router.get("/findall", verifyTokenAndAdmin, getAllOrder)
router.get("/income", verifyTokenAndAdmin, getMonthlyIncome)
router.get('/:id', verifyToken, getOrderById )
router.put('/:id/deliver', verifyTokenAndAdmin, updateOrderToDelivered)
router.put('/:id/pay', verifyTokenAndAdmin, updateOrderToPaid)



export default router