import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Car, Cars } from '../../libs/dto/car/car';
import { MemberService } from '../member/member.service';
import { ViewService } from '../view/view.service';
import { LikeService } from '../like/like.service';
import { SaveService } from '../save/save.service';
import { ADCarsInquiry, AllCarsInquiry, CarInput, CarsInquiry, OrdinaryInquiry } from '../../libs/dto/car/car.input';
import { Direction, Message } from '../../libs/enums/common.enum';
import { CarUpdate } from '../../libs/dto/car/car.update';
import { StatisticModifier, T } from '../../libs/types/common';
import { CarStatus } from '../../libs/enums/car.enum';
import * as moment from 'moment';
import { ViewGroup } from '../../libs/enums/view.enum';
import { LikeGroup } from '../../libs/enums/like.enum';
import { lookupAuthMemberLiked, lookupAuthMemberSaved, lookupMember, shapeIntoMongoObjectId } from '../../libs/config';
import { LikeInput } from '../../libs/dto/like/like.input';
import { SaveInput } from '../../libs/dto/save/save.input';
import { SaveGroup } from '../../libs/enums/save.enum';

@Injectable()
export class CarsService {
    constructor(@InjectModel('Car') private readonly carModel: Model<Car>,
        private memberService: MemberService,
        private viewService: ViewService,
        private likeService: LikeService,
        private saveService: SaveService,
    ) { }

    public async createCar(input: CarInput): Promise<Car> {
        try {
            const result = await this.carModel.create(input);
            await this.memberService.memberStatsEditor({
                _id: result.memberId,
                targetKey: 'memberCars',
                modifier: 1,
            });

            if (input.carType === 'NEW') {
                await this.memberService.memberStatsEditor({
                    _id: result.memberId,
                    targetKey: 'newCars',
                    modifier: 1,
                });
            } else {
                await this.memberService.memberStatsEditor({
                    _id: result.memberId,
                    targetKey: 'usedCars',
                    modifier: 1,
                });
            }
            return result;
        } catch (err) {
            console.log('Error CarModel: createCar', err.message);
            throw new BadRequestException(Message.CREATE_FAILED);
        }
    }

    public async updateCar(memberId: ObjectId, input: CarUpdate): Promise<Car> {

        let { carStatus, soldAt, deletedAt } = input;
        const search: T = {
            _id: input._id,
            memberId: memberId,
            carStatus: CarStatus.ACTIVE,
        };

        if (carStatus === CarStatus.SOLD) soldAt = moment().toDate();
        else if (carStatus === CarStatus.DELETE) deletedAt = moment().toDate();

        const result = await this.carModel.findByIdAndUpdate(search, input, { new: true }).exec();
        if (!result) throw new InternalServerErrorException(Message.UPDATE_FAILED);

        if (soldAt || deletedAt) {
            await this.memberService.memberStatsEditor({
                _id: memberId,
                targetKey: 'cars',
                modifier: -1,
            });
        }

        return result;
    }

    public async getCar(memberId: ObjectId, carId: ObjectId): Promise<Car> {
        const search: T = {
            _id: carId,
            carStatus: CarStatus.ACTIVE,
        };
        const targetCar = await this.carModel.findOne(search).exec();
        if (!targetCar) throw new InternalServerErrorException(Message.N0_DATA_FOUND);

        if (memberId) {
            const viewInput = { memberId: memberId, viewRefId: carId, viewGroup: ViewGroup.CAR };
            const newView = await this.viewService.recordView(viewInput);
            if (newView) {
                await this.carStatsEditor({ _id: carId, targetKey: 'carViews', modifier: 1 });
                targetCar.carViews++;
            }
            const likeInput = { memberId: memberId, likeRefId: carId, likeGroup: LikeGroup.MEMBER };
            targetCar.meLiked = await this.likeService.checkLikeExistence(likeInput);

            const saveInput = { memberId: memberId, saveRefId: carId, saveGroup: SaveGroup.MEMBER };
            targetCar.meSaved = await this.saveService.checkSaveExistence(saveInput);
        }
        targetCar.creatorData = await this.memberService.getMember(null, targetCar.memberId);

        return targetCar;
    }

    public async getCars(memberId: ObjectId, input: CarsInquiry): Promise<Cars> {
        const match: T = { carStatus: CarStatus.ACTIVE };
        const sort: T = { [input?.sort ?? 'createdAt']: input?.direction ?? Direction.DESC };
        this.shapeMatchQuery(match, input);
        const result = await this.carModel
            .aggregate([
                { $match: match },
                { $sort: sort },
                {
                    $facet: {
                        list: [
                            { $skip: (input.page - 1) * input.limit },
                            { $limit: input.limit },
                            lookupAuthMemberLiked(memberId),
                            lookupAuthMemberSaved(memberId),
                            lookupMember,
                            { $unwind: '$creatorData' },
                        ],
                        metaCounter: [{ $count: 'total' }],
                    },
                },
            ])
            .exec();
        if (!result.length) throw new InternalServerErrorException(Message.N0_DATA_FOUND);
        return result[0];
    }

    private shapeMatchQuery(match: T, input: CarsInquiry): void {
        const {
            memberId,
            typeList,
            bodyList,
            sortList,
            groupList,
            madeInList,
            brandList,
            locationList,
            tuningTypeList,
            fuelTypeList,
            driveTypeList,
            transmissionList,
            colorList,
            yearRange,
            mileageRange,
            priceRange,
            options,
            text,
        } = input.search;
        if (memberId) match.memberId = shapeIntoMongoObjectId(memberId);
        if (typeList && typeList.length) match.carType = { $in: typeList };
        if (bodyList && bodyList.length) match.carBody = { $in: bodyList };
        if (sortList && sortList.length) match.carSort = { $in: sortList };
        if (groupList && groupList.length) match.carGroup = { $in: groupList };
        if (madeInList && madeInList.length) match.carMadeIn = { $in: madeInList };
        if (brandList && brandList.length) match.carBrand = { $in: brandList };
        if (locationList && locationList.length) match.carLocation = { $in: locationList };
        if (tuningTypeList && tuningTypeList.length) match.carTuningType = { $in: tuningTypeList };
        if (fuelTypeList && fuelTypeList.length) match.carFuelType = { $in: fuelTypeList };
        if (driveTypeList && driveTypeList.length) match.carDriveType = { $in: driveTypeList };
        if (transmissionList && transmissionList.length) match.carTransmission = { $in: transmissionList };
        if (colorList && colorList.length) match.carColor = { $in: colorList };
        if (yearRange) match.carYear = { $gte: yearRange.start, $lte: yearRange.end };
        if (mileageRange) match.carMileage = { $gte: mileageRange.min, $lte: mileageRange.max };
        if (priceRange) match.carPrice = { $gte: priceRange.min, $lte: priceRange.max };
        if (text)
            match.carTitle = {
                $regex: new RegExp(text, 'i'),
            };
        if (options) {
            match['$or'] = options.map((ele) => {
                return { [ele]: true };
            });
        }
    }

    public async getVisited(memberId: ObjectId, input: OrdinaryInquiry): Promise<Cars> {
        return await this.viewService.getVisited(memberId, input);
    }

    public async getLiked(memberId: ObjectId, input: OrdinaryInquiry): Promise<Cars> {
        return await this.likeService.getLiked(memberId, input);
    }

    public async getSaved(memberId: ObjectId, input: OrdinaryInquiry): Promise<Cars> {
        return await this.saveService.getSaved(memberId, input);
    }

    public async likeTargetCar(memberId: ObjectId, likeRefId: ObjectId): Promise<Car> {
        const target: Car = await this.carModel.findOne({
            _id: likeRefId,
            carStatus: CarStatus.ACTIVE,
        });
        if (!target) throw new InternalServerErrorException(Message.N0_DATA_FOUND);

        const input: LikeInput = {
            memberId: memberId,
            likeRefId: likeRefId,
            likeGroup: LikeGroup.CAR,
        };

        const modifier: number = await this.likeService.toggleLike(input);
        const result = await this.carStatsEditor({
            _id: likeRefId,
            targetKey: 'carLikes',
            modifier: modifier,
        });

        if (!result) throw new InternalServerErrorException(Message.SOMETHING_WENT_WRONG);
        return result;
    }

    public async saveTargetCar(memberId: ObjectId, saveRefId: ObjectId): Promise<Car> {
        const target: Car = await this.carModel.findOne({
            _id: saveRefId,
            carStatus: CarStatus.ACTIVE,
        });
        if (!target) throw new InternalServerErrorException(Message.N0_DATA_FOUND);

        const input: SaveInput = {
            memberId: memberId,
            saveRefId: saveRefId,
            saveGroup: SaveGroup.CAR,
        };

        const modifier: number = await this.saveService.toggleSave(input);
        const result = await this.carStatsEditor({
            _id: saveRefId,
            targetKey: 'carSave',
            modifier: modifier,
        });
        return result;
    }

    public async getAgentDealerCars(memberId: ObjectId, input: ADCarsInquiry): Promise<Cars> {
        const { carStatus } = input.search;
        if (carStatus === CarStatus.DELETE) throw new InternalServerErrorException(Message.NOT_ALLOWED_REQUEST);

        const match: T = {
            memberId: memberId,
            carStatus: carStatus ?? { $ne: CarStatus.DELETE },
        };
        const sort: T = { [input?.sort ?? 'createdAt']: input?.direction ?? Direction.DESC };

        const result = await this.carModel.aggregate([
            { $match: match },
            { $sort: sort },
            {
                $facet: {
                    list: [
                        { $skip: (input.page - 1) * input.limit },
                        { $limit: input.limit },
                        lookupMember,
                        { $unwind: '$creatorData' },
                    ],
                    metaCounter: [{ $count: 'total' }],
                },
            },
        ]).exec();
        if (!result) throw new InternalServerErrorException(Message.N0_DATA_FOUND);

        return result[0];
    }

    public async getAllCarsByAdmin(input: AllCarsInquiry): Promise<Cars> {
        const {
            carStatus,
            bodyList,
            sortList,
            groupList,
            madeInList,
            brandList,
            locationList,
            tuningTypeList,
            fuelTypeList,
            text,
        } = input.search;
        const match: T = {};
        const sort: T = { [input?.sort ?? 'createdAt']: input?.direction ?? Direction.DESC };

        if (carStatus && carStatus.length) match.carStatus = carStatus;
        if (bodyList && bodyList.length) match.carBody = { $in: bodyList };
        if (sortList && sortList.length) match.carBody = { $in: sortList };
        if (groupList && groupList.length) match.carBody = { $in: groupList };
        if (madeInList && madeInList.length) match.carBody = { $in: madeInList };
        if (brandList && brandList.length) match.carBody = { $in: brandList };
        if (locationList && locationList.length) match.carBody = { $in: locationList };
        if (tuningTypeList && tuningTypeList.length) match.carBody = { $in: tuningTypeList };
        if (fuelTypeList && fuelTypeList.length) match.carBody = { $in: fuelTypeList };
        if (text) match.carTitle = { $regex: new RegExp(text, 'i') };


        const result = await this.carModel
            .aggregate([
                { $match: match },
                { $sort: sort },
                {
                    $facet: {
                        list: [
                            { $skip: (input.page - 1) * input.limit },
                            { $limit: input.limit },
                            lookupMember,
                            { $unwind: '$creatorData' },
                        ],
                        metaCounter: [{ $count: 'total' }],
                    },
                },
            ])
            .exec();

        if (!result.length) throw new InternalServerErrorException(Message.N0_DATA_FOUND);
        return result[0];
    }

    public async updateCarByAdmin(input: CarUpdate): Promise<Car> {
        let { carStatus, deletedAt } = input;
        const search: T = {
            _id: input._id,
            carStatus: CarStatus.ACTIVE,
        };

        if (carStatus === CarStatus.DELETE) deletedAt = moment().toDate();

        const result = await this.carModel.findOneAndUpdate(search, input, { new: true }).exec();
        if (!result) throw new InternalServerErrorException(Message.UPDATE_FAILED);

        if (deletedAt) {
            await this.memberService.memberStatsEditor({
                _id: result.memberId,
                targetKey: 'memberCars',
                modifier: -1,
            });
        }
        return result;
    }

    public async removeCarByAdmin(carId: ObjectId): Promise<Car> {
        const search: T = { _id: carId, carStatus: CarStatus.DELETE };
        const result = await this.carModel.findOneAndDelete(search).exec();
        if (!result) throw new InternalServerErrorException(Message.REMOVE_FAILED);
        return result;
    }



    public async carStatsEditor(input: StatisticModifier): Promise<Car> {
        const { _id, targetKey, modifier } = input;
        return await this.carModel.findByIdAndUpdate(
            _id, { $inc: { [targetKey]: modifier } }, { new: true }).exec();
    }
}
