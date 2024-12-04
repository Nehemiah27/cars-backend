import { errorResponse } from "../helpers/response-helper.js";

export const validateRequest = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return errorResponse(res, error.details[0].message, 400);
  next();
};

export const validateFormDataRequest = (schema) => (req) => {
  const { error } = schema.validate(req.body);
  if (error) return { code: 400, message: error.details[0].message };
  return { code: 200, message: "" };
};
