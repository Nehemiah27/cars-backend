import Joi from "joi";
import { updateSpecificsErrors } from "../constant/message.constant.js";

const specificsSchema = Joi.object({
  value: Joi.string().allow("").required().messages({
    "string.base": updateSpecificsErrors.VALUE_STRING,
    "any.required": updateSpecificsErrors.VALUE_REQUIRED,
  }),
  feature: Joi.boolean().required().messages({
    "boolean.base": updateSpecificsErrors.FEATURE_BOOLEAN,
    "any.required": updateSpecificsErrors.FEATURE_REQUIRED,
  }),
});

const specificationBundle = {
  engineDisplacement: specificsSchema,
  powerFigure: specificsSchema,
  torqueFigure: specificsSchema,
  driveTrain: specificsSchema,
  transmission: specificsSchema,
};

const specificationsSchema = Joi.object({
  overview: Joi.object(specificationBundle).optional().messages({
    "object.base": updateSpecificsErrors.INNER_SPECIFICATIONS_OBJECT,
  }),
  engineAndTransmission: Joi.object(specificationBundle).optional().messages({
    "object.base": updateSpecificsErrors.INNER_SPECIFICATIONS_OBJECT,
  }),
  hybridSystem: Joi.object(specificationBundle).optional().messages({
    "object.base": updateSpecificsErrors.INNER_SPECIFICATIONS_OBJECT,
  }),
  performanceAndEfficiency: Joi.object(specificationBundle)
    .optional()
    .messages({
      "object.base": updateSpecificsErrors.INNER_SPECIFICATIONS_OBJECT,
    }),
  exteriorEquipment: Joi.object(specificationBundle).optional().messages({
    "object.base": updateSpecificsErrors.INNER_SPECIFICATIONS_OBJECT,
  }),
  interiorEquipment: Joi.object(specificationBundle).optional().messages({
    "object.base": updateSpecificsErrors.INNER_SPECIFICATIONS_OBJECT,
  }),
  seatsAndUpholestry: Joi.object(specificationBundle).optional().messages({
    "object.base": updateSpecificsErrors.INNER_SPECIFICATIONS_OBJECT,
  }),
  entertainmentFront: Joi.object(specificationBundle).optional().messages({
    "object.base": updateSpecificsErrors.INNER_SPECIFICATIONS_OBJECT,
  }),
  entertainmentRear: Joi.object(specificationBundle).optional().messages({
    "object.base": updateSpecificsErrors.INNER_SPECIFICATIONS_OBJECT,
  }),
  safetyEquipments: Joi.object(specificationBundle).optional().messages({
    "object.base": updateSpecificsErrors.INNER_SPECIFICATIONS_OBJECT,
  }),
  supsensionBrakesWheelsAndTyres: Joi.object(specificationBundle)
    .optional()
    .messages({
      "object.base": updateSpecificsErrors.INNER_SPECIFICATIONS_OBJECT,
    }),
  dimensionsWeightStorageCapacity: Joi.object(specificationBundle)
    .optional()
    .messages({
      "object.base": updateSpecificsErrors.INNER_SPECIFICATIONS_OBJECT,
    }),
  warrantyAndServicePackage: Joi.object(specificationBundle)
    .optional()
    .messages({
      "object.base": updateSpecificsErrors.INNER_SPECIFICATIONS_OBJECT,
    }),
  exteriorColours: Joi.object(specificationBundle).optional().messages({
    "object.base": updateSpecificsErrors.INNER_SPECIFICATIONS_OBJECT,
  }),
})
  .or(
    "overview",
    "engineAndTransmission",
    "hybridSystem",
    "performanceAndEfficiency",
    "exteriorEquipment",
    "interiorEquipment",
    "seatsAndUpholestry",
    "entertainmentFront",
    "entertainmentRear",
    "safetyEquipments",
    "supsensionBrakesWheelsAndTyres",
    "dimensionsWeightStorageCapacity",
    "warrantyAndServicePackage",
    "exteriorColours"
  )
  .messages({
    "object.missing": updateSpecificsErrors.SPECIFICATIONS_PROPERTY_REQUIRED,
  });

export const updateCarSpecificationSchema = Joi.object({
  carID: Joi.string().required().messages({
    "string.base": updateSpecificsErrors.CAR_ID_STRING,
    "string.empty": updateSpecificsErrors.CAR_ID_EMPTY,
    "any.required": updateSpecificsErrors.CAR_ID_REQUIRED,
  }),
  specifications: specificationsSchema.required().messages({
    "object.base": updateSpecificsErrors.SPECIFICATIONS_OBJECT,
    "any.required": updateSpecificsErrors.SPECIFICATIONS_REQUIRED,
  }),
});
