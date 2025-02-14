import { Field, Int, ObjectType } from "@nestjs/graphql";
import { ObjectId } from "mongoose";
import { AuthType, Brand, CarServiceType, Location, Status, Type, } from "../../enums/member.enum";
import { MeFollowed } from "../follow/follow";
import { MeLiked } from "../like/like";


@ObjectType()
export class Member {
    @Field(() => String)
    _id: ObjectId;

    @Field(() => Type)
    type: Type;

    @Field(() => Status)
    status: Status;

    @Field(() => AuthType)
    authType: AuthType;

    @Field(() => String)
    titleNick: string;

    password?: string;

    @Field(() => String, { nullable: true })
    fullName?: string;

    @Field(() => String)
    image?: string;

    @Field(() => String)
    viewImage?: string;

    @Field(() => String, { nullable: true })
    address?: string;

    @Field(() => String, { nullable: true })
    shortDesc?: string;

    @Field(() => String, { nullable: true })
    longDesc?: string;

    @Field(() => String)
    phone: string;

    @Field(() => String, { nullable: true })
    phone2?: string;

    @Field(() => String, { nullable: true })
    email?: string;

    @Field(() => String, { nullable: true })
    kakaoTalk?: string;

    @Field(() => String, { nullable: true })
    youtube?: string;

    @Field(() => String, { nullable: true })
    instagram?: string;

    @Field(() => String, { nullable: true })
    facebook?: string;

    @Field(() => String, { nullable: true })
    tikTok?: string;

    @Field(() => String, { nullable: true })
    naverBlog?: string;

    @Field(() => String, { nullable: true })
    xcom?: string;

    @Field(() => Int)
    followers: number;

    @Field(() => Int)
    followings: number;

    @Field(() => Int)
    likes: number;

    @Field(() => Int)
    views: number;

    @Field(() => Int)
    comments: number;

    @Field(() => Int)
    warnings: number;

    @Field(() => Int)
    articles: number;

    @Field(() => Int)
    blocks: number;

    @Field(() => Int)
    memberCars: number;

    @Field(() => Int)
    usedCars: number;

    @Field(() => Int)
    newCars: number;

    @Field(() => Int)
    rank: number;

    @Field(() => Int)
    points: number;

    @Field(() => Int)
    sellerProducts: number;

    @Field(() => Boolean)
    dealerFinancing: boolean;

    @Field(() => Boolean)
    dealerCarService: boolean;

    @Field(() => Boolean)
    dealerTradeIn: boolean;

    @Field(() => Boolean)
    dealerCustomization: boolean;

    @Field(() => Boolean)
    dealerWarranties: boolean;

    @Field(() => Boolean)
    dealerParts: boolean;

    @Field(() => Boolean)
    dealerAccessories: boolean;

    @Field(() => Boolean)
    dealerCarDetailing: boolean;

    @Field(() => Boolean)
    dealerCarWash: boolean;

    @Field(() => Boolean)
    dealerCarTestDrive: boolean;

    @Field(() => Boolean)
    dealerCarDelivery: boolean;

    @Field(() => Boolean)
    carOilChange: boolean;

    @Field(() => Boolean)
    carAlignment: boolean;

    @Field(() => Boolean)
    carTireChange: boolean;

    @Field(() => Boolean)
    carBrakeCheck: boolean;

    @Field(() => Boolean)
    carBatteryCheck: boolean;

    @Field(() => Boolean)
    carTireBalance: boolean;

    @Field(() => Boolean)
    carSuspension: boolean;

    @Field(() => Boolean)
    carAirCondition: boolean;

    @Field(() => Boolean)
    carTransmissionCheck: boolean;

    @Field(() => Boolean)
    carEngineDiagnostic: boolean;

    @Field(() => Boolean)
    carExhaust: boolean;

    @Field(() => Boolean)
    carDetailing: boolean;

    @Field(() => Boolean)
    carWindshield: boolean;

    @Field(() => Boolean)
    carTimingBelt: boolean;

    @Field(() => Boolean)
    carChainReplacement: boolean;

    @Field(() => Int)
    comfort: number;

    @Field(() => Int)
    performance: number;

    @Field(() => Int)
    exterior: number;

    @Field(() => Int)
    interior: number;

    @Field(() => Int)
    reliability: number;

    @Field(() => Int)
    fast: number;

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

    @Field(() => Boolean)
    publicHolidays: boolean;

    @Field(() => Date, { nullable: true })
    deletedAt?: Date;

    @Field(() => Date)
    createdAt: Date;

    @Field(() => Date)
    updatedAt: Date;

    @Field(() => String, { nullable: true })
    accessToken?: string

    @Field(() => [MeLiked], { nullable: true })
    meLiked?: MeLiked[];

    @Field(() => [MeFollowed], { nullable: true })
    meFollowed?: MeFollowed[];
}

@ObjectType()
export class TotalCounter {
    @Field(() => Int, { nullable: true })
    total: number;
}

@ObjectType()
export class Members {
    @Field(() => [Member])
    list: Member[];

    @Field(() => [TotalCounter], { nullable: true })
    metaCounter: TotalCounter[];
}