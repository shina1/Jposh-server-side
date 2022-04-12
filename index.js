import express from "express";
import connectDB from "./connect/db.js";
// import dotenv from 'dotenv';
import {} from 'dotenv/config'
import cors from "cors";
import usersRoutes from "./routes/user.js"
import auth from "./routes/auth.js"
import productRoute from "./routes/productRoute.js"
import cartRoute from "./routes/cartRoute.js"
import orderRoute from "./routes/orderRoutes.js"
import paymentRoute from "./routes/paymentRoute.js"


// dotenv.config();

const app = express()

app.use(cors())
app.use(express.json())
connectDB()
// user endpoints
app.use("/api/v1/users", usersRoutes)
app.use("/api/v1/auth", auth)

// product endpoints
app.use("/api/v1/products", productRoute)

// cart endpoints
app.use("/api/v1/cart", cartRoute)

// order endpoint

app.use("/api/v1/order", orderRoute)

// checkout endpoint

app.use('/api/v1/checkout', paymentRoute)



// app.get("/", (req, res) => {
//   res.send("API is running...");
// });
const PORT = process.env.PORT || 2600

app.listen(
    PORT,
    console.log(
      `server running on port ${PORT}`
    )
  );