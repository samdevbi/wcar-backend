import { Field, Int, ObjectType } from "@nestjs/graphql";
import { ObjectId } from "mongoose";
import { Member, TotalCounter } from "../member/member";
import { MeLiked } from "../like/like";
import { MeSaved } from "../save/save";
import { CarBody, CarBrand, CarColor, CarDriveType, CarFuelType, CarGroup, CarLocation, CarMadeIn, CarStatus, CarTransmission, CarTuningType, CarType } from "../../enums/car.enum";



@ObjectType()
export class Car {
    @Field(() => String)
    _id: ObjectId;

    @Field(() => CarType)
    carType: CarType;

    @Field(() => String)
    carTitle: string;

    @Field(() => CarBody)
    carBody: CarBody;

    @Field(() => CarStatus)
    carStatus: CarStatus;

    @Field(() => CarGroup)
    carGroup: CarGroup;

    @Field(() => CarMadeIn)
    carMadeIn: CarMadeIn;

    @Field(() => CarBrand)
    carBrand: CarBrand;

    @Field(() => String)
    carModel: string;

    @Field(() => Int)
    carPrice: number;

    @Field(() => [String])
    carImages: string[];

    @Field(() => String, { nullable: true })
    carVideo?: string;

    @Field(() => CarLocation)
    carLocation: CarLocation;

    @Field(() => String)
    carAddress: string;

    @Field(() => String, { nullable: true })
    carDesc?: string

    @Field(() => Boolean)
    carBarter: boolean;

    @Field(() => Boolean)
    carRent: boolean;

    @Field(() => Int)
    carYear: number;

    @Field(() => Int)
    carMileage: number;

    @Field(() => CarFuelType)
    carFuelType: CarFuelType;

    @Field(() => CarDriveType)
    carDriveType: CarDriveType;

    @Field(() => CarTransmission)
    carTransmission: CarTransmission;

    @Field(() => String)
    carEngineSize: string;

    @Field(() => CarColor)
    carColor: CarColor;

    @Field(() => String)
    carFullFuel: string;

    @Field(() => Int)
    carMpgHw: number;

    @Field(() => Int)
    carMpgCity: number;

    @Field(() => String, { nullable: true })
    carDoor?: string;

    @Field(() => String, { nullable: true })
    carCylinders?: string;

    @Field(() => String, { nullable: true })
    carMaxSpeed?: string;

    @Field(() => String, { nullable: true })
    carHundredSpeed?: string;

    @Field(() => String, { nullable: true })
    carHorsePower?: string;

    @Field(() => String, { nullable: true })
    carTorque?: string;

    @Field(() => String, { nullable: true })
    carLength?: string;

    @Field(() => String, { nullable: true })
    carHeigth?: string;

    @Field(() => String, { nullable: true })
    carWidth?: string;

    @Field(() => String, { nullable: true })
    carSeatsUp?: string;

    @Field(() => String, { nullable: true })
    carWeigth?: string;

    @Field(() => String, { nullable: true })
    carLoadWeight?: string;

    @Field(() => String, { nullable: true })
    carTireSize?: string;

    @Field(() => String, { nullable: true })
    carWheelBase?: string;

    @Field(() => Boolean)
    carAutoBrake: boolean;

    @Field(() => Boolean)
    carCruiseControl: boolean;

    @Field(() => Boolean)
    carESC: boolean;

    @Field(() => Boolean)
    carAutonomuosDrive: boolean;

    @Field(() => Boolean)
    carExteriorLight: boolean;

    @Field(() => Boolean)
    carPanoramicSunroof: boolean;

    @Field(() => Boolean)
    carHeatedSeats: boolean;

    @Field(() => Boolean)
    carCooledSeats: boolean;

    @Field(() => Boolean)
    carTouchscreenDisplay: boolean;

    @Field(() => Boolean)
    carAutoHeadLight: boolean;

    @Field(() => Boolean)
    carStarStop: boolean;

    @Field(() => Boolean)
    carNoiseCancellation: boolean;

    @Field(() => Boolean)
    carRemoteKeyless: boolean;

    @Field(() => Boolean)
    carLaneDW: boolean;

    @Field(() => Boolean)
    carBlindSpotMonitoring: boolean;

    @Field(() => Boolean)
    carRearCrossTrafficAlert: boolean;

    @Field(() => Boolean)
    carApplePlay: boolean;

    @Field(() => Boolean)
    carAndroidAuto: boolean;

    @Field(() => Boolean)
    carVoiceControl: boolean;

    @Field(() => Boolean)
    carBluetoothConnectivity: boolean;

    @Field(() => Boolean)
    carWirelessCharging: boolean;

    @Field(() => Boolean)
    carParkingAssist: boolean;

    @Field(() => Boolean)
    carSurroundViewCamera: boolean;

    @Field(() => Boolean)
    carFrontSensors: boolean;

    @Field(() => Boolean)
    carRearSensors: boolean;

    @Field(() => Boolean)
    carFrontRecordCamera: boolean;

    @Field(() => Boolean)
    carRearRecordCamera: boolean;

    @Field(() => Boolean)
    carHeadsUpDisplay: boolean;

    @Field(() => Boolean)
    carClimateControl: boolean;

    @Field(() => Boolean)
    carAdjustableSeats: boolean;

    @Field(() => Boolean)
    carMemorySeats: boolean;

    @Field(() => Boolean)
    carPowerTrain: boolean;

    @Field(() => Boolean)
    carRegenerativeBraking: boolean;

    @Field(() => Boolean)
    carTractionControl: boolean;

    @Field(() => Boolean)
    carStabilityControl: boolean;

    @Field(() => Boolean)
    carHillStartAssist: boolean;

    @Field(() => Boolean)
    carTirePressureSystem: boolean;

    @Field(() => Boolean)
    carPushButton: boolean;

    @Field(() => Int)
    carCrush: number;

    @Field(() => Int)
    carRepair: number;

    @Field(() => Boolean)
    carFrontBumper: boolean;

    @Field(() => Boolean)
    carBackBumper: boolean;

    @Field(() => Boolean)
    carBonnet: boolean;

    @Field(() => Boolean)
    carTailgate: boolean;

    @Field(() => Boolean)
    carRightFrontWing: boolean;

    @Field(() => Boolean)
    carLeftFrontWing: boolean;

    @Field(() => Boolean)
    carRightBackWing: boolean;

    @Field(() => Boolean)
    carLeftBackWing: boolean;

    @Field(() => Boolean)
    carRoof: boolean;

    @Field(() => Boolean)
    carRightFrontDoor: boolean;

    @Field(() => Boolean)
    carLeftFrontDoor: boolean;

    @Field(() => Boolean)
    carRightBackDoor: boolean;

    @Field(() => Boolean)
    carLeftBackDoor: boolean;

    @Field(() => Int)
    carViews: number;

    @Field(() => Int)
    carLikes: number;

    @Field(() => Int)
    carSave: number;

    @Field(() => Int)
    carComments: number;

    @Field(() => Int)
    carRank: number;

    @Field(() => String)
    memberId: ObjectId;

    @Field(() => Date, { nullable: true })
    soldAt?: Date;

    @Field(() => Date, { nullable: true })
    deletedAt?: Date;

    @Field(() => Date,)
    createdAt: Date;

    @Field(() => Date)
    updatedAt: Date;

    @Field(() => Member, { nullable: true })
    creatorData?: Member;

    @Field(() => [MeLiked], { nullable: true })
    meLiked?: MeLiked[];

    @Field(() => [MeSaved], { nullable: true })
    meSaved?: MeSaved[];

}

@ObjectType()
export class Cars {
    @Field(() => [Car])
    list: Car[];

    @Field(() => [TotalCounter], { nullable: true })
    metaCounter: TotalCounter[];
}