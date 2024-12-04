import express from "express";
import {
  addCar,
  allCars,
  carData,
  carInfoData,
  updateCarInfo,
  updateCarSpecifications,
  summary,
} from "../controllers/car-controller.js";
import { validateRequest } from "../middlewares/validation-middleware.js";
import { updateCarInfoSchema } from "../validations/update-car-info-validation.js";
import { updateCarSpecificationSchema } from "../validations/update-car-specification-validation.js";

const router = express.Router();

router.post("/add-car", addCar);

router.get("/all-cars", allCars);

router.get("/car-data/:carID", carData);

router.get("/car-info/:carID", carInfoData);

router.post(
  "/update-car-info",
  validateRequest(updateCarInfoSchema),
  updateCarInfo
);

router.post(
  "/update-specifications",
  validateRequest(updateCarSpecificationSchema),
  updateCarSpecifications
);

router.get("/summary/:carID", summary);

export default router;
