import express from "express";
import connectDB from "./connect/db.js";
import dotenv from 'dotenv';
import usersRoutes from "./routes/usersRoutes.js"





dotenv.config();

const app = express()

app.use(express.json())

app.use("/api/v1/users", usersRoutes)


connectDB()
app.get("/", (req, res) => {
  res.send("API is running...");
});
const PORT = process.env.PORT || 2600

app.listen(
    PORT,
    console.log(
      `server running on port ${PORT}`
    )
  );