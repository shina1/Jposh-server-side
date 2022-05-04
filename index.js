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
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";


// dotenv.config();

const app = express();

// app.use(cors({
//   origin: '*'
// }));

app.use(cors())
app.use(express.json());
connectDB();
// user endpoints
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/auth", auth);

// product endpoints
app.use("/api/v1/products", productRoute);

// cart endpoints
app.use("/api/v1/cart", cartRoute);

// order endpoint

app.use("/api/v1/order", orderRoute);

// checkout endpoint

app.use('/api/v1/checkout', paymentRoute);

app.use(notFound)
app.use(errorHandler)


// const PORT = process.env.PORT ||  5500;
const PORT = 5500

const server = app.listen(
    PORT,
    console.log(
      `server running on port ${PORT}`
    )
  );

process.on('unhandledRejection', err => {
  console.log("UNHANDLED REJECTION! shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1)
  })
});