import {
  addCarErrors,
  carResponses,
  summaryErrors,
} from "../constant/message.constant.js";
import { validateFormDataRequest } from "../middlewares/validation-middleware.js";
import Car from "../models/car.js";
import { addCarSchema } from "../validations/add-car-validation.js";
import { respondWithDelete, uploadHandler } from "./upload-service.js";
import { v4 as uuid } from "uuid";

export const addNewCar = async (req, res) => {
  const uploadStatus = await uploadHandler(req, res),
    { code, audioPath, videoPath } = uploadStatus;
  if (code !== 200)
    return respondWithDelete(audioPath, videoPath, uploadStatus);

  const payloadValidation = validateFormDataRequest(addCarSchema)(req);
  if (payloadValidation.code !== 200)
    return respondWithDelete(audioPath, videoPath, payloadValidation);

  const { featuredVideo } = req.body;
  let videoURL = featuredVideo;
  if ((videoURL === undefined || videoURL === "") && videoPath === "")
    return respondWithDelete(audioPath, videoPath, {
      code: 400,
      message: addCarErrors.VIDEO_FILE_REQUIRED,
    });

  if (videoPath !== "") videoURL = videoPath;
  await createCar(req.body, audioPath, videoURL);
  return {
    code: 200,
    message: carResponses.ADDED_SUCCESS,
  };
};

export const allCarsData = async () => {
  const carData = await Car.find({}).select({ carID: 1, name: 1, _id: 0 });
  return { message: carResponses.FETCH_SUCCESS, data: carData };
};

export const fullCarData = async (carID) => {
  const currentCar = await Car.findOne({ carID }).select({
    _id: 0,
    __v: 0,
    createdAt: 0,
    updatedAt: 0,
  });
  return { message: carResponses.CAR_DATA_FETCH_SUCCESS, data: currentCar };
};

export const carInfo = async (carID) => {
  const currentCar = await Car.findOne({ carID }).select({
    _id: 0,
    info: 1,
  });
  return { message: carResponses.CAR_INFO_FETCH_SUCCESS, data: currentCar };
};

export const updateInfo = async (infoUpdate) => {
  const { carID, info } = infoUpdate;
  await Car.findOneAndUpdate({ carID }, { info });
  return { message: carResponses.CAR_INFO_UPDATE_SUCCESS };
};

export const updateSpecifications = async (specifics) => {
  const { carID, specifications } = specifics,
    currentSpecific = Object.keys(specifications)[0];
  await Car.findOneAndUpdate(
    { carID },
    { [`specifications.${currentSpecific}`]: specifications[currentSpecific] }
  );
  return { message: carResponses.SPECIFICATIONS_UPDATE_SUCCESS };
};

export const generateSummary = async (carID) => {
  const carData = await Car.findOne({ carID });
  if (!carData) return { code: 400, message: summaryErrors.CAR_NOT_FOUND };
  const specifications = carData.specifications,
    filteredSpecifications = {};
  Object.keys(specifications).forEach((section) => {
    const sectionData = specifications[section];
    filteredSpecifications[section] = Object.keys(sectionData)
      .filter((key) => sectionData[key].feature)
      .map((key) => sectionData[key].value);
  });
  return {
    code: 200,
    message: carResponses.SUMMARY_GENERATE_SUCCESS,
    data: filteredSpecifications,
  };
};

const createCar = async (carInfo, audioPath, videoURL) => {
  await Car.create({
    carID: uuid(),
    ...carInfo,
    exhaustNote: audioPath,
    featuredVideo: videoURL,
  });
};
