import express, { json, static as static_ } from "express";
import cors from "cors";
import envCaptured from "./config/env-validation.js";
import connectDB from "./config/database.js";
import errorHandler from "./middlewares/error-handler.js";
import globalException from "./middlewares/global-exception.js";
import carRoutes from "./routes/car-routes.js";

const app = express(),
  PORT = envCaptured.port;
connectDB(envCaptured.mongoose.url);
app.use(json({ limit: "500mb" }));
app.use(cors());
app.use("/api/v1/cars", carRoutes);
app.use("/api/v1/audio", static_("audio"));
app.use("/api/v1/video", static_("video"));
app.use(errorHandler);
app.use(globalException);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`App is running on Port ${PORT}`);
});
