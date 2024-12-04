import Joi from "joi";
import { addCarErrors } from "../constant/message.constant.js";

export const addCarSchema = Joi.object({
  category: Joi.string().required().messages({
    "string.base": addCarErrors.CATEGORY_STRING,
    "string.empty": addCarErrors.CATEGORY_EMPTY,
    "any.required": addCarErrors.CATEGORY_REQUIRED,
  }),
  name: Joi.string().required().messages({
    "string.base": addCarErrors.NAME_STRING,
    "string.empty": addCarErrors.NAME_EMPTY,
    "any.required": addCarErrors.NAME_REQUIRED,
  }),
  price: Joi.number().positive().required().messages({
    "number.base": addCarErrors.PRICE_NUMBER,
    "number.positive": addCarErrors.PRICE_POSITIVE,
    "any.required": addCarErrors.PRICE_REQUIRED,
  }),
  kmsDriven: Joi.number().positive().required().messages({
    "number.base": addCarErrors.KMS_DRIVEN_NUMBER,
    "number.positive": addCarErrors.KMS_DRIVEN_POSITIVE,
    "any.required": addCarErrors.KMS_DRIVEN_REQUIRED,
  }),
  fuelType: Joi.string().required().messages({
    "string.base": addCarErrors.FUEL_TYPE_STRING,
    "string.empty": addCarErrors.FUEL_TYPE_EMPTY,
    "any.required": addCarErrors.FUEL_TYPE_REQUIRED,
  }),
  regState: Joi.string().required().messages({
    "string.base": addCarErrors.REG_STATE_STRING,
    "string.empty": addCarErrors.REG_STATE_EMPTY,
    "any.required": addCarErrors.REG_STATE_REQUIRED,
  }),
  featuredVideo: Joi.string().optional().allow("").messages({
    "string.base": addCarErrors.FEATURED_VIDEO_STRING,
  }),
});
