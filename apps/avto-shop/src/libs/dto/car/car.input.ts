import { Field, InputType, Int } from "@nestjs/graphql";
import { IsIn, IsInt, IsNotEmpty, IsOptional, Length, Min } from "class-validator";
import { availableCarSorts, availableOptions } from "../../config";
import { Direction } from "../../enums/common.enum";
import { ObjectId } from "mongoose";
import { CarBody, CarBrand, CarColor, CarDriveType, CarFuelType, CarGroup, CarLocation, CarMadeIn, CarSort, CarStatus, CarTransmission, CarTuningType, CarType } from "../../enums/car.enum";



@InputType()
export class CarInput {

    @IsNotEmpty()
    @Field(() => CarType)
    carType: CarType;

    @IsNotEmpty()
    @Field(() => String)
    carTitle: string;

    @IsNotEmpty()
    @Field(() => CarBody)
    carBody: CarBody;

    @IsNotEmpty()
    @Field(() => CarGroup)
    carGroup: CarGroup;

    @IsNotEmpty()
    @Field(() => CarMadeIn)
    carMadeIn: CarMadeIn;

    @IsNotEmpty()
    @Field(() => CarBrand)
    carBrand: CarBrand;

    @IsNotEmpty()
    @Field(() => String)
    carModel: string;

    @IsNotEmpty()
    @IsInt()
    @Field(() => Int)
    carPrice: number;

    @IsNotEmpty()
    @Field(() => [String])
    carImages: string[];

    @IsOptional()
    @Field(() => String, { nullable: true })
    carVideo?: string;

    @IsNotEmpty()
    @Field(() => CarLocation)
    carLocation: CarLocation;

    @IsNotEmpty()
    @Field(() => String)
    carAddress: string;

    @IsOptional()
    @Field(() => String, { nullable: true })
    carDesc?: string

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carBarter?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carRent?: boolean;

    @IsNotEmpty()
    @IsInt()
    @Field(() => Int)
    carYear: number;

    @IsNotEmpty()
    @IsInt()
    @Field(() => Int)
    carMileage: number;

    @IsNotEmpty()
    @Field(() => CarFuelType)
    carFuelType: CarFuelType;

    @IsNotEmpty()
    @Field(() => CarDriveType)
    carDriveType: CarDriveType;

    @IsNotEmpty()
    @Field(() => CarTransmission)
    carTransmission: CarTransmission;

    @IsNotEmpty()
    @Field(() => String)
    carEngineSize: string;

    @IsNotEmpty()
    @Field(() => CarColor)
    carColor: CarColor;

    @IsNotEmpty()
    @Field(() => String)
    carFullFuel: string;

    @IsNotEmpty()
    @IsInt()
    @Field(() => Int)
    carMpgHw: number;

    @IsNotEmpty()
    @IsInt()
    @Field(() => Int)
    carMpgCity: number;

    @IsOptional()
    @Field(() => String, { nullable: true })
    carDoor?: string;

    @IsOptional()
    @Field(() => String, { nullable: true })
    carCylinders?: string;

    @IsOptional()
    @Field(() => String, { nullable: true })
    carMaxSpeed?: string;

    @IsOptional()
    @Field(() => String, { nullable: true })
    carHundredSpeed?: string;

    @IsOptional()
    @Field(() => String, { nullable: true })
    carHorsePower?: string;

    @IsOptional()
    @Field(() => String, { nullable: true })
    carTorque?: string;

    @IsOptional()
    @Field(() => String, { nullable: true })
    carLength?: string;

    @IsOptional()
    @Field(() => String, { nullable: true })
    carHeigth?: string;

    @IsOptional()
    @Field(() => String, { nullable: true })
    carWidth?: string;

    @IsOptional()
    @Field(() => String, { nullable: true })
    carSeatsUp?: string;

    @IsOptional()
    @Field(() => String, { nullable: true })
    carWeigth?: string;

    @IsOptional()
    @Field(() => String, { nullable: true })
    carLoadWeight?: string;

    @IsOptional()
    @Field(() => String, { nullable: true })
    carTireSize?: string;

    @IsOptional()
    @Field(() => String, { nullable: true })
    carWheelBase?: string;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carAutoBrake?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carCruiseControl?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carESC?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carAutonomuosDrive?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carExteriorLight?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carPanoramicSunroof?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carHeatedSeats?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carCooledSeats?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carTouchscreenDisplay?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carAutoHeadLight?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carStarStop?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carNoiseCancellation?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carRemoteKeyless?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carLaneDW?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carBlindSpotMonitoring?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carRearCrossTrafficAlert?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carApplePlay?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carAndroidAuto?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carVoiceControl?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carBluetoothConnectivity?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carWirelessCharging?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carParkingAssist?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carSurroundViewCamera?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carFrontSensors?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carRearSensors?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carFrontRecordCamera?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carRearRecordCamera?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carHeadsUpDisplay?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carClimateControl?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carAdjustableSeats?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carMemorySeats?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carPowerTrain?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carRegenerativeBraking?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carTractionControl?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carStabilityControl?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carHillStartAssist?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carTirePressureSystem?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carPushButton?: boolean;

    @IsOptional()
    @IsInt()
    @Field(() => Int, { nullable: true })
    carCrush?: number;

    @IsOptional()
    @IsInt()
    @Field(() => Int, { nullable: true })
    carRepair?: number;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carFrontBumper?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carBackBumper?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carBonnet?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carTailgate?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carRightFrontWing?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carLeftFrontWing?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carRightBackWing?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carLeftBackWing?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carRoof?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carRightFrontDoor?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carLeftFrontDoor?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carRightBackDoor?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carLeftBackDoor?: boolean;

    memberId: ObjectId;

}

@InputType()
export class CarRange {
    @IsInt()
    @Field(() => Int)
    min: number;

    @IsInt()
    @Field(() => Int)
    max: number
}

@InputType()
export class PeriodRange {
    @Field(() => Int)
    start: number;

    @Field(() => Int)
    end: number
}

@InputType()
class CISearch {
    @IsOptional()
    @Field(() => String, { nullable: true })
    memberId?: string;

    @IsOptional()
    @Field(() => [CarType], { nullable: true })
    typeList?: CarType[];

    @IsOptional()
    @Field(() => [CarBody], { nullable: true })
    bodyList?: CarBody[];

    @IsOptional()
    @Field(() => [CarSort], { nullable: true })
    sortList?: CarSort[];

    @IsOptional()
    @Field(() => [CarGroup], { nullable: true })
    groupList?: CarGroup[];

    @IsOptional()
    @Field(() => [CarMadeIn], { nullable: true })
    madeInList?: CarMadeIn[];

    @IsOptional()
    @Field(() => [CarBrand], { nullable: true })
    brandList?: CarBrand[];

    @IsOptional()
    @Field(() => [CarLocation], { nullable: true })
    locationList?: CarLocation[];

    @IsOptional()
    @Field(() => [CarTuningType], { nullable: true })
    tuningTypeList?: CarTuningType[];

    @IsOptional()
    @Field(() => [CarFuelType], { nullable: true })
    fuelTypeList?: CarFuelType[];

    @IsOptional()
    @Field(() => [CarDriveType], { nullable: true })
    driveTypeList?: CarDriveType[];

    @IsOptional()
    @Field(() => [CarTransmission], { nullable: true })
    transmissionList?: CarTransmission[];

    @IsOptional()
    @Field(() => [CarColor], { nullable: true })
    colorList?: CarColor[];

    @IsOptional()
    @Field(() => PeriodRange, { nullable: true })
    yearRange?: PeriodRange;

    @IsOptional()
    @Field(() => CarRange, { nullable: true })
    mileageRange?: CarRange;

    @IsOptional()
    @Field(() => CarRange, { nullable: true })
    priceRange?: CarRange;

    @IsOptional()
    @IsIn(availableOptions, { each: true })
    @Field(() => [String], { nullable: true })
    options?: string[];

    @IsOptional()
    @Field(() => String, { nullable: true })
    text?: string;
}

@InputType()
export class CarsInquiry {
    @IsNotEmpty()
    @Min(1)
    @Field(() => Int)
    page: number;

    @IsNotEmpty()
    @Min(1)
    @Field(() => Int)
    limit: number;

    @IsOptional()
    @IsIn(availableCarSorts)
    @Field(() => String, { nullable: true })
    sort?: string;

    @IsOptional()
    @Field(() => Direction, { nullable: true })
    direction?: Direction;

    @IsNotEmpty()
    @Field(() => CISearch)
    search: CISearch;
}

@InputType()
class ADCISearch {
    @IsOptional()
    @Field(() => CarStatus, { nullable: true })
    carStatus?: CarStatus;
}

@InputType()
export class ADCarsInquiry {
    @IsNotEmpty()
    @Min(1)
    @Field(() => Int)
    page: number;

    @IsNotEmpty()
    @Min(1)
    @Field(() => Int)
    limit: number;

    @IsOptional()
    @IsIn(availableCarSorts)
    @Field(() => String, { nullable: true })
    sort?: string;

    @IsOptional()
    @Field(() => Direction, { nullable: true })
    direction?: Direction;

    @IsNotEmpty()
    @Field(() => ADCISearch)
    search: ADCISearch;
}

@InputType()
class ALCISearch {
    @IsOptional()
    @Field(() => CarStatus, { nullable: true })
    carStatus?: CarStatus;

    @IsOptional()
    @Field(() => [CarBody], { nullable: true })
    bodyList?: CarBody[];

    @IsOptional()
    @Field(() => [CarSort], { nullable: true })
    sortList?: CarSort[];

    @IsOptional()
    @Field(() => [CarGroup], { nullable: true })
    groupList?: CarGroup[];

    @IsOptional()
    @Field(() => [CarMadeIn], { nullable: true })
    madeInList?: CarMadeIn[];

    @IsOptional()
    @Field(() => [CarBrand], { nullable: true })
    brandList?: CarBrand[];

    @IsOptional()
    @Field(() => [CarLocation], { nullable: true })
    locationList?: CarLocation[];

    @IsOptional()
    @Field(() => [CarTuningType], { nullable: true })
    tuningTypeList?: CarTuningType[];

    @IsOptional()
    @Field(() => [CarFuelType], { nullable: true })
    fuelTypeList?: CarFuelType[];

    @IsOptional()
    @Field(() => String, { nullable: true })
    text?: string;

}

@InputType()
export class AllCarsInquiry {
    @IsNotEmpty()
    @Min(1)
    @Field(() => Int)
    page: number;

    @IsNotEmpty()
    @Min(1)
    @Field(() => Int)
    limit: number;

    @IsOptional()
    @IsIn(availableCarSorts)
    @Field(() => String, { nullable: true })
    sort?: string;

    @IsOptional()
    @Field(() => Direction, { nullable: true })
    direction?: Direction;

    @IsNotEmpty()
    @Field(() => ALCISearch)
    search: ALCISearch;
}

@InputType()
export class OrdinaryInquiry {
    @IsNotEmpty()
    @Min(1)
    @Field(() => Int)
    page: number;

    @IsNotEmpty()
    @Min(1)
    @Field(() => Int)
    limit: number;
}