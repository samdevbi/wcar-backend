import { Schema } from 'mongoose';
import { CarBody, CarBrand, CarColor, CarDriveType, CarFuelType, CarGroup, CarLocation, CarMadeIn, CarStatus, CarTransmission, CarTuningType, CarType } from '../libs/enums/car.enum';

const CarSchema = new Schema(
    {
        carType: {
            type: String,
            enum: CarType,
            required: true,
        },

        carTitle: {
            type: String,
            required: true,
        },

        carModel: {
            type: String,
            required: true,
        },

        carBody: {
            type: String,
            enum: CarBody,
            required: true,
        },

        carStatus: {
            type: String,
            enum: CarStatus,
            default: CarStatus.ACTIVE,
        },

        carGroup: {
            type: String,
            enum: CarGroup,
            required: true,
        },

        carMadeIn: {
            type: String,
            enum: CarMadeIn,
            required: true,
        },

        carBrand: {
            type: String,
            enum: CarBrand,
            required: true,
        },

        carPrice: {
            type: Number,
            required: true,
        },

        carImages: {
            type: [String],
            required: true,
        },

        carVideo: {
            type: String,
        },

        carLocation: {
            type: String,
            enum: CarLocation,
            required: true,
        },

        carAddress: {
            type: String,
            required: true,
        },

        carDesc: {
            type: String,
        },

        carBarter: {
            type: Boolean,
            default: false,
        },

        carRent: {
            type: Boolean,
            default: false,
        },

        carYear: {
            type: Number,
            required: true,
        },

        carMileage: {
            type: Number,
            required: true,
        },

        carFuelType: {
            type: String,
            enum: CarFuelType,
            required: true,
        },

        carDriveType: {
            type: String,
            enum: CarDriveType,
            required: true,
        },

        carTransmission: {
            type: String,
            enum: CarTransmission,
            required: true,
        },

        carEngineSize: {
            type: String,
            required: true,
        },

        carColor: {
            type: String,
            enum: CarColor,
            required: true,
        },

        carFullFuel: {
            type: String,
            required: true,
        },

        carMpgHw: {
            type: Number,
            required: true,
        },

        carMpgCity: {
            type: Number,
            required: true,
        },

        carDoor: {
            type: String,
        },

        carCylinders: {
            type: String,
        },

        carMaxSpeed: {
            type: String,
        },

        carHundredSpeed: {
            type: String,
        },

        carHorsePower: {
            type: String,
        },

        carTorque: {
            type: String,
        },


        carLength: {
            type: String,
        },

        carHeigth: {
            type: String,
        },

        carWidth: {
            type: String,
        },

        carSeatsUp: {
            type: String,
        },

        carWeigth: {
            type: String,
        },

        carLoadWeight: {
            type: String,
        },

        carTireSize: {
            type: String,
        },

        carWheelBase: {
            type: String,
        },

        carAutoBrake: {
            type: Boolean,
            default: false,
        },

        carCruiseControl: {
            type: Boolean,
            default: false,
        },

        carESC: {
            type: Boolean,
            default: false,
        },

        carAutonomuosDrive: {
            type: Boolean,
            default: false,
        },

        carExteriorLight: {
            type: Boolean,
            default: false,
        },

        carPanoramicSunroof: {
            type: Boolean,
            default: false,
        },

        carHeatedSeats: {
            type: Boolean,
            default: false,
        },

        carCooledSeats: {
            type: Boolean,
            default: false,
        },

        carTouchscreenDisplay: {
            type: Boolean,
            default: false,
        },

        carAutoHeadLight: {
            type: Boolean,
            default: false,
        },

        carStarStop: {
            type: Boolean,
            default: false,
        },

        carNoiseCancellation: {
            type: Boolean,
            default: false,
        },

        carRemoteKeyless: {
            type: Boolean,
            default: false,
        },

        carLaneDW: {
            type: Boolean,
            default: false,
        },

        carBlindSpotMonitoring: {
            type: Boolean,
            default: false,
        },

        carRearCrossTrafficAlert: {
            type: Boolean,
            default: false,
        },

        carApplePlay: {
            type: Boolean,
            default: false,
        },

        carAndroidAuto: {
            type: Boolean,
            default: false,
        },

        carVoiceControl: {
            type: Boolean,
            default: false,
        },

        carBluetoothConnectivity: {
            type: Boolean,
            default: false,
        },

        carWirelessCharging: {
            type: Boolean,
            default: false,
        },

        carParkingAssist: {
            type: Boolean,
            default: false,
        },

        carSurroundViewCamera: {
            type: Boolean,
            default: false,
        },

        carFrontSensors: {
            type: Boolean,
            default: false,
        },

        carRearSensors: {
            type: Boolean,
            default: false,
        },

        carFrontRecordCamera: {
            type: Boolean,
            default: false,
        },

        carRearRecordCamera: {
            type: Boolean,
            default: false,
        },

        carHeadsUpDisplay: {
            type: Boolean,
            default: false,
        },

        carClimateControl: {
            type: Boolean,
            default: false,
        },

        carAdjustableSeats: {
            type: Boolean,
            default: false,
        },

        carMemorySeats: {
            type: Boolean,
            default: false,
        },

        carPowerTrain: {
            type: Boolean,
            default: false,
        },

        carRegenerativeBraking: {
            type: Boolean,
            default: false,
        },

        carTractionControl: {
            type: Boolean,
            default: false,
        },

        carStabilityControl: {
            type: Boolean,
            default: false,
        },

        carHillStartAssist: {
            type: Boolean,
            default: false,
        },

        carTirePressureSystem: {
            type: Boolean,
            default: false,
        },

        carPushButton: {
            type: Boolean,
            default: false,
        },

        carCrush: {
            type: Number,
            default: 0,
        },

        carRepair: {
            type: Number,
            default: 0,
        },

        carFrontBumper: {
            type: Boolean,
            default: false,
        },

        carBackBumper: {
            type: Boolean,
            default: false,
        },

        carBonnet: {
            type: Boolean,
            default: false,
        },

        carTailgate: {
            type: Boolean,
            default: false,
        },

        carRightFrontWing: {
            type: Boolean,
            default: false,
        },

        carLeftFrontWing: {
            type: Boolean,
            default: false,
        },

        carRightBackWing: {
            type: Boolean,
            default: false,
        },

        carLeftBackWing: {
            type: Boolean,
            default: false,
        },

        carRoof: {
            type: Boolean,
            default: false,
        },

        carRightFrontDoor: {
            type: Boolean,
            default: false,
        },

        carLeftFrontDoor: {
            type: Boolean,
            default: false,
        },

        carRightBackDoor: {
            type: Boolean,
            default: false,
        },

        carLeftBackDoor: {
            type: Boolean,
            default: false,
        },

        carViews: {
            type: Number,
            default: 0,
        },

        carLikes: {
            type: Number,
            default: 0,
        },

        carSave: {
            type: Number,
            default: 0,
        },

        carComments: {
            type: Number,
            default: 0,
        },

        carRank: {
            type: Number,
            default: 0,
        },

        memberId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Member',
        },

        soldAt: {
            type: Date,
        },

        deletedAt: {
            type: Date,
        },
    },
    { timestamps: true, collection: 'cars' },
);

CarSchema.index({ carType: 1, carLocation: 1, carTitle: 1, carPrice: 1, carBody: 1 }, { unique: true });

export default CarSchema;