import express from "express";
import { stripePayment } from "../controllers/paymentControler";


const router = express.Router()

router.post('/payment', stripePayment)




export default router