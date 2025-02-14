import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, Length } from "class-validator";
import { Brand, CarServiceType, Location, Status, Type } from "../../enums/member.enum";



@InputType()
export class MemberUpdate {


    @IsNotEmpty()
    @Field(() => String)
    _id: string;

    @IsOptional()
    @Field(() => Type, { nullable: true })
    type?: Type;

    @IsOptional()
    @Field(() => Status, { nullable: true })
    status?: Status;

    @IsOptional()
    @Field(() => String, { nullable: true })
    titleNick?: string;

    @IsOptional()
    @Field(() => String, { nullable: true })
    password?: string;

    @IsOptional()
    @Field(() => String, { nullable: true })
    fullName?: string;

    @IsOptional()
    @Field(() => String, { nullable: true })
    address?: string;

    @IsOptional()
    @Field(() => String, { nullable: true })
    shortDesc?: string;

    @IsOptional()
    @Field(() => String, { nullable: true })
    longDesc?: string;

    @IsOptional()
    @Field(() => String, { nullable: true })
    phone?: string;

    @IsOptional()
    @Field(() => String, { nullable: true })
    phone2?: string;

    @IsOptional()
    @Field(() => String, { nullable: true })
    email?: string;

    @IsOptional()
    @Field(() => String, { nullable: true })
    kakaoTalk?: string;

    @IsOptional()
    @Field(() => String, { nullable: true })
    youtube?: string;

    @IsOptional()
    @Field(() => String, { nullable: true })
    instagram?: string;

    @IsOptional()
    @Field(() => String, { nullable: true })
    facebook?: string;

    @IsOptional()
    @Field(() => String, { nullable: true })
    tikTok?: string;

    @IsOptional()
    @Field(() => String, { nullable: true })
    naverBlog?: string;

    @IsOptional()
    @Field(() => String, { nullable: true })
    xcom?: string;

    @IsOptional()
    @Field(() => String, { nullable: true })
    image?: string;

    @IsOptional()
    @Field(() => String, { nullable: true })
    viewImage?: string;

    @Field(() => Boolean, { nullable: true })
    dealerFinancing?: boolean;

    @Field(() => Boolean, { nullable: true })
    dealerCarService?: boolean;

    @Field(() => Boolean, { nullable: true })
    dealerTradeIn?: boolean;

    @Field(() => Boolean, { nullable: true })
    dealerCustomization?: boolean;

    @Field(() => Boolean, { nullable: true })
    dealerWarranties?: boolean;

    @Field(() => Boolean, { nullable: true })
    dealerParts?: boolean;

    @Field(() => Boolean, { nullable: true })
    dealerAccessories?: boolean;

    @Field(() => Boolean, { nullable: true })
    dealerCarDetailing?: boolean;

    @Field(() => Boolean, { nullable: true })
    dealerCarWash?: boolean;

    @Field(() => Boolean, { nullable: true })
    dealerCarTestDrive?: boolean;

    @Field(() => Boolean, { nullable: true })
    dealerCarDelivery?: boolean;

    @Field(() => Boolean, { nullable: true })
    carOilChange?: boolean;

    @Field(() => Boolean, { nullable: true })
    carAlignment?: boolean;

    @Field(() => Boolean, { nullable: true })
    carTireChange?: boolean;

    @Field(() => Boolean, { nullable: true })
    carBrakeCheck?: boolean;

    @Field(() => Boolean, { nullable: true })
    carBatteryCheck?: boolean;

    @Field(() => Boolean, { nullable: true })
    carTireBalance?: boolean;

    @Field(() => Boolean, { nullable: true })
    carSuspension?: boolean;

    @Field(() => Boolean, { nullable: true })
    carAirCondition?: boolean;

    @Field(() => Boolean, { nullable: true })
    carTransmissionCheck?: boolean;

    @Field(() => Boolean, { nullable: true })
    carEngineDiagnostic?: boolean;

    @Field(() => Boolean, { nullable: true })
    carExhaust?: boolean;

    @Field(() => Boolean, { nullable: true })
    carDetailing?: boolean;

    @Field(() => Boolean, { nullable: true })
    carWindshield?: boolean;

    @Field(() => Boolean, { nullable: true })
    carTimingBelt?: boolean;

    @Field(() => Boolean, { nullable: true })
    carChainReplacement?: boolean;

    @Field(() => String, { nullable: true })
    openAt?: string;

    @Field(() => String, { nullable: true })
    closeAt?: string;

    @Field(() => String, { nullable: true })
    openSunday?: string;

    @Field(() => String, { nullable: true })
    closeSunday?: string;

    @Field(() => String, { nullable: true })
    openSaturday?: string;

    @Field(() => String, { nullable: true })
    closeSaturday?: string;

    @Field(() => Boolean, { nullable: true })
    publicHolidays?: boolean;

    deletedAt?: Date;

}