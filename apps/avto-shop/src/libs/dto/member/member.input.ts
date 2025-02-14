import { Field, InputType, Int } from "@nestjs/graphql";
import { IsIn, IsNotEmpty, IsOptional, Length, Min } from "class-validator";
import { AuthType, Brand, CarServiceType, Location, Status, Type } from "../../enums/member.enum";
import { availableADSSorts, availableMemberSorts } from "../../config";
import { Direction } from "../../enums/common.enum";




@InputType()
export class MemberInput {
    @IsOptional()
    @Field(() => Type, { nullable: true })
    type?: Type;

    @IsNotEmpty()
    @Field(() => String)
    titleNick: string;

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
    @Field(() => AuthType, { nullable: true })
    authType?: AuthType;

    @IsNotEmpty()
    @Field(() => String)
    phone: string;

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

    @IsNotEmpty()
    @Field(() => String)
    password: string;

    @IsOptional()
    @Field(() => String, { nullable: true })
    image?: string;

    @IsOptional()
    @Field(() => String, { nullable: true })
    viewImage?: string;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    dealerFinancing?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    dealerCarService?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    dealerTradeIn?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    dealerCustomization?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    dealerWarranties?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    dealerParts?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    dealerAccessories?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    dealerCarDetailing?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    dealerCarWash?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    dealerCarTestDrive?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    dealerCarDelivery?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carOilChange?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carAlignment?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carTireChange?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carBrakeCheck?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carBatteryCheck?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carTireBalance?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carSuspension?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carAirCondition?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carTransmissionCheck?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carEngineDiagnostic?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carExhaust?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carDetailing?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carWindshield?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carTimingBelt?: boolean;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    carChainReplacement?: boolean;

    @IsOptional()
    @Field(() => String, { nullable: true })
    openAt?: string;

    @IsOptional()
    @Field(() => String, { nullable: true })
    closeAt?: string;

    @IsOptional()
    @Field(() => String, { nullable: true })
    openSunday?: string;

    @IsOptional()
    @Field(() => String, { nullable: true })
    closeSunday?: string;

    @IsOptional()
    @Field(() => String, { nullable: true })
    openSaturday?: string;

    @IsOptional()
    @Field(() => String, { nullable: true })
    closeSaturday?: string;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    publicHolidays?: boolean;
};

@InputType()
export class LoginInput {
    @IsNotEmpty()
    @Field(() => String)
    titleNick: string;

    @IsNotEmpty()
    @Field(() => String)
    password: string;
};

@InputType()
class ADSISearch {
    @IsOptional()
    @Field(() => String, { nullable: true })
    text?: string;
}

@InputType()
export class ADSInquiry {
    @IsNotEmpty()
    @Min(1)
    @Field(() => Int)
    page: number;

    @IsNotEmpty()
    @Min(1)
    @Field(() => Int)
    limit: number;

    @IsOptional()
    @IsIn(availableADSSorts)
    @Field(() => String, { nullable: true })
    sort?: string;

    @IsOptional()
    @Field(() => Direction, { nullable: true })
    direction?: Direction;

    @IsNotEmpty()
    @Field(() => ADSISearch)
    search: ADSISearch;
};

@InputType()
class MISearch {
    @IsOptional()
    @Field(() => Status, { nullable: true })
    status?: Status;

    @IsOptional()
    @Field(() => Type, { nullable: true })
    type?: Type;

    @IsOptional()
    @Field(() => String, { nullable: true })
    text?: string;
}

@InputType()
export class MembersInquiry {
    @IsNotEmpty()
    @Min(1)
    @Field(() => Int)
    page: number;

    @IsNotEmpty()
    @Min(1)
    @Field(() => Int)
    limit: number;

    @IsOptional()
    @IsIn(availableMemberSorts)
    @Field(() => String, { nullable: true })
    sort?: string;

    @IsOptional()
    @Field(() => Direction, { nullable: true })
    direction?: Direction;

    @IsNotEmpty()
    @Field(() => MISearch)
    search: MISearch;
};