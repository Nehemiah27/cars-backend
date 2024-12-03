import express, { json } from "express";
import cors from "cors";
import envCaptured from "./config/env-validation.js";
import connectDB from "./config/database.js";
import errorHandler from "./middlewares/error-handler.js";
import globalException from "./middlewares/global-exception.js";

const app = express(),
  PORT = envCaptured.port;
connectDB(envCaptured.mongoose.url);
app.use(json({ limit: "500mb" }));
app.use(cors());
app.use(errorHandler);
app.use(globalException);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`App is running on Port ${PORT}`);
});
