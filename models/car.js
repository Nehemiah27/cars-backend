import mongoose from "mongoose";

const specificationsSchema = {
  value: { type: String, default: "" },
  feature: { type: Boolean, default: false },
};

const carsSchema = new mongoose.Schema(
  {
    carID: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    kmsDriven: {
      type: Number,
      required: true,
      trim: true,
    },
    fuelType: {
      type: String,
      required: true,
      trim: true,
    },
    regState: {
      type: String,
      required: true,
      trim: true,
    },
    featuredVideo: {
      type: String,
      required: true,
      trim: true,
    },
    exhaustNote: {
      type: String,
      required: true,
      trim: true,
    },
    info: {
      type: String,
      default: "",
    },
    specifications: {
      overview: {
        engineDisplacement: specificationsSchema,
        powerFigure: specificationsSchema,
        torqueFigure: specificationsSchema,
        driveTrain: specificationsSchema,
        transmission: specificationsSchema,
      },
      engineAndTransmission: {
        engineDisplacement: specificationsSchema,
        powerFigure: specificationsSchema,
        torqueFigure: specificationsSchema,
        driveTrain: specificationsSchema,
        transmission: specificationsSchema,
      },
      hybridSystem: {
        engineDisplacement: specificationsSchema,
        powerFigure: specificationsSchema,
        torqueFigure: specificationsSchema,
        driveTrain: specificationsSchema,
        transmission: specificationsSchema,
      },
      performanceAndEfficiency: {
        engineDisplacement: specificationsSchema,
        powerFigure: specificationsSchema,
        torqueFigure: specificationsSchema,
        driveTrain: specificationsSchema,
        transmission: specificationsSchema,
      },
      exteriorEquipment: {
        engineDisplacement: specificationsSchema,
        powerFigure: specificationsSchema,
        torqueFigure: specificationsSchema,
        driveTrain: specificationsSchema,
        transmission: specificationsSchema,
      },
      interiorEquipment: {
        engineDisplacement: specificationsSchema,
        powerFigure: specificationsSchema,
        torqueFigure: specificationsSchema,
        driveTrain: specificationsSchema,
        transmission: specificationsSchema,
      },
      seatsAndUpholestry: {
        engineDisplacement: specificationsSchema,
        powerFigure: specificationsSchema,
        torqueFigure: specificationsSchema,
        driveTrain: specificationsSchema,
        transmission: specificationsSchema,
      },
      entertainmentFront: {
        engineDisplacement: specificationsSchema,
        powerFigure: specificationsSchema,
        torqueFigure: specificationsSchema,
        driveTrain: specificationsSchema,
        transmission: specificationsSchema,
      },
      entertainmentRear: {
        engineDisplacement: specificationsSchema,
        powerFigure: specificationsSchema,
        torqueFigure: specificationsSchema,
        driveTrain: specificationsSchema,
        transmission: specificationsSchema,
      },
      safetyEquipments: {
        engineDisplacement: specificationsSchema,
        powerFigure: specificationsSchema,
        torqueFigure: specificationsSchema,
        driveTrain: specificationsSchema,
        transmission: specificationsSchema,
      },
      supsensionBrakesWheelsAndTyres: {
        engineDisplacement: specificationsSchema,
        powerFigure: specificationsSchema,
        torqueFigure: specificationsSchema,
        driveTrain: specificationsSchema,
        transmission: specificationsSchema,
      },
      dimensionsWeightStorageCapacity: {
        engineDisplacement: specificationsSchema,
        powerFigure: specificationsSchema,
        torqueFigure: specificationsSchema,
        driveTrain: specificationsSchema,
        transmission: specificationsSchema,
      },
      warrantyAndServicePackage: {
        engineDisplacement: specificationsSchema,
        powerFigure: specificationsSchema,
        torqueFigure: specificationsSchema,
        driveTrain: specificationsSchema,
        transmission: specificationsSchema,
      },
      exteriorColours: {
        engineDisplacement: specificationsSchema,
        powerFigure: specificationsSchema,
        torqueFigure: specificationsSchema,
        driveTrain: specificationsSchema,
        transmission: specificationsSchema,
      },
    },
  },
  {
    timestamps: true,
  }
);
const Car = mongoose.model("Car", carsSchema);

export default Car;
