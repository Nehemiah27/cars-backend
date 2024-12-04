import Joi from "joi";
import { updateCarInfoErrors } from "../constant/message.constant.js";

export const updateCarInfoSchema = Joi.object({
  carID: Joi.string().required().messages({
    "string.base": updateCarInfoErrors.CAR_ID_STRING,
    "string.empty": updateCarInfoErrors.CAR_ID_EMPTY,
    "any.required": updateCarInfoErrors.CAR_ID_REQUIRED,
  }),
  info: Joi.string().allow("").required().messages({
    "string.base": updateCarInfoErrors.INFO_STRING,
    "any.required": updateCarInfoErrors.INFO_REQUIRED,
  }),
});
