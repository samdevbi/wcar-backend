import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { View } from '../../libs/dto/view/view';
import { ViewInput } from '../../libs/dto/view/view.input';
import { OrdinaryInquiry } from '../../libs/dto/car/car.input';
import { T } from '../../libs/types/common';
import { lookupVisited } from '../../libs/config';
import { Cars } from '../../libs/dto/car/car';
import { ViewGroup } from '../../libs/enums/view.enum';
import { CarStatus } from '../../libs/enums/car.enum';

@Injectable()
export class ViewService {
    constructor(@InjectModel('View') private readonly viewModel: Model<View>) { }

    public async recordView(input: ViewInput): Promise<View | null> {
        const viewExist = await this.checkViewexistence(input);
        if (!viewExist) {
            console.log('- New view Insert -');
            return await this.viewModel.create(input);
        } else return null;
    }

    private async checkViewexistence(input: ViewInput): Promise<View> {
        const { memberId, viewRefId } = input;
        const search: T = {
            memberId: memberId, viewRefId: viewRefId
        };
        return await this.viewModel.findOne(search).exec();
    }

    public async getVisited(memberId: ObjectId, input: OrdinaryInquiry): Promise<Cars> {
        const { page, limit } = input;
        const match: T = { viewGroup: ViewGroup.CAR, memberId: memberId };

        const data: T = await this.viewModel.aggregate([
            { $match: match },
            { $sort: { updatedAt: -1 } },
            {
                $lookup: {
                    from: 'cars',
                    localField: 'viewRefId',
                    foreignField: '_id',
                    as: 'visitedCar',
                },
            },
            { $unwind: '$visitedCar' },
            {
                $facet: {
                    list: [
                        { $skip: (page - 1) * limit },
                        { $limit: limit },
                        lookupVisited,
                        { $unwind: '$visitedCar.creatorData' }
                    ],
                    metaCounter: [{ $count: 'total' }],
                },
            },
        ]).exec();


        const result: Cars = { list: [], metaCounter: data[0].metaCounter };
        result.list = data[0].list.map((ele) => ele.visitedCar);
        return result;
    }

}
