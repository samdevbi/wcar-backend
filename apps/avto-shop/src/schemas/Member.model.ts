import { Schema } from 'mongoose';
import { AuthType, Brand, CarServiceType, Location, Status, Type } from '../libs/enums/member.enum';


const MemberSchema = new Schema({
    type: {
        type: String,
        enum: Type,
        default: Type.USER,
    },

    status: {
        type: String,
        enum: Status,
        default: Status.ACTIVE,
    },

    authType: {
        type: String,
        enum: AuthType,
        default: AuthType.PHONE,
    },

    titleNick: {
        type: String,
        index: { unique: true, sparse: true },
        required: true,
    },

    password: {
        type: String,
        select: false,
        required: true,
    },

    fullName: {
        type: String,
    },

    image: {
        type: String,
        default: '',
    },

    viewImage: {
        type: String,
        default: '',
    },

    address: {
        type: String,
    },

    shortDesc: {
        type: String,
    },

    longDesc: {
        type: String,
    },

    phone: {
        type: String,
        index: { unique: true, sparse: true },
        required: true,
    },

    phone2: {
        type: String,
    },

    email: {
        type: String,
    },

    kakaoTalk: {
        type: String,
    },

    youtube: {
        type: String,
    },

    instagram: {
        type: String,
    },

    facebook: {
        type: String,
    },

    tikTok: {
        type: String,
    },

    naverBlog: {
        type: String,
    },

    xcom: {
        type: String,
    },

    followers: {
        type: Number,
        default: 0,
    },

    followings: {
        type: Number,
        default: 0,
    },

    likes: {
        type: Number,
        default: 0,
    },

    views: {
        type: Number,
        default: 0,
    },

    comments: {
        type: Number,
        default: 0,
    },

    articles: {
        type: Number,
        default: 0,
    },


    warnings: {
        type: Number,
        default: 0,
    },

    blocks: {
        type: Number,
        default: 0,
    },

    memberCars: {
        type: Number,
        default: 0,
    },

    usedCars: {
        type: Number,
        default: 0,
    },

    newCars: {
        type: Number,
        default: 0,
    },

    rank: {
        type: Number,
        default: 0,
    },

    points: {
        type: Number,
        default: 0,
    },

    sellerProducts: {
        type: Number,
        default: 0,
    },

    dealerFinancing: {
        type: Boolean,
        default: false,
    },

    dealerCarService: {
        type: Boolean,
        default: false,
    },

    dealerTradeIn: {
        type: Boolean,
        default: false,
    },

    dealerCustomization: {
        type: Boolean,
        default: false,
    },

    dealerWarranties: {
        type: Boolean,
        default: false,
    },

    dealerParts: {
        type: Boolean,
        default: false,
    },

    dealerAccessories: {
        type: Boolean,
        default: false,
    },

    dealerCarDetailing: {
        type: Boolean,
        default: false,
    },

    dealerCarWash: {
        type: Boolean,
        default: false,
    },

    dealerCarTestDrive: {
        type: Boolean,
        default: false,
    },

    dealerCarDelivery: {
        type: Boolean,
        default: false,
    },

    carOilChange: {
        type: Boolean,
        default: false,
    },

    carAlignment: {
        type: Boolean,
        default: false,
    },

    carTireChange: {
        type: Boolean,
        default: false,
    },

    carBrakeCheck: {
        type: Boolean,
        default: false,
    },

    carBatteryCheck: {
        type: Boolean,
        default: false,
    },

    carTireBalance: {
        type: Boolean,
        default: false,
    },

    carSuspension: {
        type: Boolean,
        default: false,
    },

    carAirCondition: {
        type: Boolean,
        default: false,
    },

    carTransmissionCheck: {
        type: Boolean,
        default: false,
    },

    carEngineDiagnostic: {
        type: Boolean,
        default: false,
    },

    carExhaust: {
        type: Boolean,
        default: false,
    },

    carDetailing: {
        type: Boolean,
        default: false,
    },

    carWindshield: {
        type: Boolean,
        default: false,
    },

    carTimingBelt: {
        type: Boolean,
        default: false,
    },

    carChainReplacement: {
        type: Boolean,
        default: false,
    },

    comfort: {
        type: Number,
        default: 0,
    },

    performance: {
        type: Number,
        default: 0,
    },

    exterior: {
        type: Number,
        default: 0,
    },

    interior: {
        type: Number,
        default: 0,
    },

    reliability: {
        type: Number,
        default: 0,
    },

    fast: {
        type: Number,
        default: 0,
    },

    openAt: {
        type: String,
    },

    closeAt: {
        type: String,
    },

    openSunday: {
        type: String,
    },

    closeSunday: {
        type: String,
    },

    openSaturday: {
        type: String,
    },

    closeSaturday: {
        type: String,
    },

    publicHolidays: {
        type: Boolean,
        default: false,
    },

    deletedAt: {
        type: Date,
    },
},
    { timestamps: true, collection: 'members' },
);

export default MemberSchema;