import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { MeSaved, Save } from "../../libs/dto/save/save";
import { SaveInput } from "../../libs/dto/save/save.input";
import { T } from "../../libs/types/common";
import { Message } from "../../libs/enums/common.enum";
import { OrdinaryInquiry } from "../../libs/dto/car/car.input";
import { lookupSaved } from "../../libs/config";
import { Cars } from "../../libs/dto/car/car";
import { CarStatus } from "../../libs/enums/car.enum";
import { SaveGroup } from "../../libs/enums/save.enum";

@Injectable()
export class SaveService {
    constructor(@InjectModel('Save') private readonly saveModel: Model<Save>) { }

    public async toggleSave(input: SaveInput): Promise<number> {
        const search: T = { memberId: input.memberId, saveRefId: input.saveRefId } = input,
            exist = await this.saveModel.findOne(search).exec();
        let modifier = 1;
        if (exist) {
            await this.saveModel.findOneAndDelete(search).exec();
            modifier = -1
        } else {
            try {
                await this.saveModel.create(input);
            } catch (err) {
                console.log('Error: SaveService.model', err.message);
                throw new InternalServerErrorException(Message.CREATE_FAILED);
            }
        }
        console.log(`-SaveIndikator- ${modifier}`);
        return modifier;
    }

    public async checkSaveExistence(input): Promise<MeSaved[]> {
        const { memberId, saveRefId } = input;
        const result = await this.saveModel.findOne({ memberId: memberId, saveRefId: saveRefId }).exec();
        return result ? [{ memberId: memberId, saveRefId: saveRefId, mySaved: true }] : [];
    }

    public async getSaved(memberId: ObjectId, input: OrdinaryInquiry): Promise<Cars> {
        const { page, limit } = input;
        const match: T = { saveGroup: SaveGroup.CAR, memberId: memberId };

        const data: T = await this.saveModel.aggregate([
            { $match: match },
            { $sort: { updatedAt: -1 } },
            {
                $lookup: {
                    from: 'cars',
                    localField: 'saveRefId',
                    foreignField: '_id',
                    as: 'savedCar',
                },
            },
            { $unwind: '$savedCar' },
            {
                $facet: {
                    list: [
                        { $skip: (page - 1) * limit },
                        { $limit: limit },
                        lookupSaved,
                        { $unwind: '$savedCar.creatorData' }
                    ],
                    metaCounter: [{ $count: 'total' }],
                },
            },
        ]).exec();


        const result: Cars = { list: [], metaCounter: data[0].metaCounter };
        result.list = data[0].list.map((ele) => ele.savedCar);
        return result;
    }
}
