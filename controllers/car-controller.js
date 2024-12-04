import { errorResponse, successResponse } from "../helpers/response-helper.js";
import { serverErrors } from "../constant/message.constant.js";
import {
  addNewCar,
  allCarsData,
  fullCarData,
  carInfo,
  updateInfo,
  updateSpecifications,
  generateSummary,
} from "../services/car-service.js";

export const addCar = async (req, res) => {
  try {
    const addCarStatus = await addNewCar(req, res);
    if (addCarStatus.code === 200)
      return successResponse(res, addCarStatus.message, addCarStatus.data);
    else return errorResponse(res, addCarStatus.message, addCarStatus.code);
  } catch (error) {
    return errorResponse(
      res,
      serverErrors.INTERNAL_SERVER_ERROR,
      500,
      error.stack
    );
  }
};

export const allCars = async (req, res) => {
  try {
    const allCarData = await allCarsData();
    return successResponse(res, allCarData.message, allCarData.data);
  } catch (error) {
    return errorResponse(
      res,
      serverErrors.INTERNAL_SERVER_ERROR,
      500,
      error.stack
    );
  }
};

export const carData = async (req, res) => {
  try {
    const carID = req.params.carID,
      carInformation = await fullCarData(carID);
    return successResponse(res, carInformation.message, carInformation.data);
  } catch (error) {
    return errorResponse(
      res,
      serverErrors.INTERNAL_SERVER_ERROR,
      500,
      error.stack
    );
  }
};

export const carInfoData = async (req, res) => {
  try {
    const carID = req.params.carID,
      carInformation = await carInfo(carID);
    return successResponse(res, carInformation.message, carInformation.data);
  } catch (error) {
    return errorResponse(
      res,
      serverErrors.INTERNAL_SERVER_ERROR,
      500,
      error.stack
    );
  }
};

export const updateCarInfo = async (req, res) => {
  try {
    const carInformation = await updateInfo(req.body);
    return successResponse(res, carInformation.message);
  } catch (error) {
    return errorResponse(
      res,
      serverErrors.INTERNAL_SERVER_ERROR,
      500,
      error.stack
    );
  }
};

export const updateCarSpecifications = async (req, res) => {
  try {
    const carInformation = await updateSpecifications(req.body);
    return successResponse(res, carInformation.message);
  } catch (error) {
    return errorResponse(
      res,
      serverErrors.INTERNAL_SERVER_ERROR,
      500,
      error.stack
    );
  }
};

export const summary = async (req, res) => {
  try {
    const carID = req.params.carID,
      carSummary = await generateSummary(carID);
    if (carSummary.code === 200)
      return successResponse(res, carSummary.message, carSummary.data);
    else return errorResponse(res, carSummary.message, carSummary.code);
  } catch (error) {
    return errorResponse(
      res,
      serverErrors.INTERNAL_SERVER_ERROR,
      500,
      error.stack
    );
  }
};
