import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

// dotenv.config();
dotenv.config({ path: "../.env" });

mongoose
  .connect(process.env.MONGO_URI) // .env içerisindeki bağlantı kodu tırnak içine alınmayınca oluyor tırnak içine alırsan hata veriyor
  .then(() => {
    console.log("MongoDb is connected");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json()); // json verileri console vb alanlara düzgün yansıtma aktarma için bu bir şart
app.use(cookieParser());

app.listen(3000, () => {
  console.log("Server is runnig on port 3000!");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
