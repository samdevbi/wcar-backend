import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Car } from 'apps/avto-shop/src/libs/dto/car/car';
import { Member } from 'apps/avto-shop/src/libs/dto/member/member';
import { CarStatus } from 'apps/avto-shop/src/libs/enums/car.enum';
import { Status, Type } from 'apps/avto-shop/src/libs/enums/member.enum';
import { Model } from 'mongoose';

@Injectable()
export class AvtoShopBatchService {
  constructor(
    @InjectModel('Car') private readonly carModel: Model<Car>,
    @InjectModel('Member') private readonly memberModel: Model<Member>,
  ) { }

  getHello(): string {
    return 'Welcome to Batch server!';
  }

  public async batchRollback(): Promise<void> {
    await this.carModel.updateMany(
      { carStatus: CarStatus.ACTIVE },
      { carRank: 0 },
    ).exec();

    await this.memberModel.updateMany(
      {
        status: Status.ACTIVE,
        type: Type.AGENT
      },
      { rank: 0 },
    ).exec();
  } // 

  public async batchTopCar(): Promise<void> {
    const cars: Car[] = await this.carModel.find(
      {
        carStatus: CarStatus.ACTIVE,
        carRank: 0,
      }
    ).exec();

    const promisedList = cars.map(async (ele: Car) => {
      const { _id, carSave, carLikes, carViews } = ele;
      const rank = carSave * 100 + carLikes * 50 + carViews * 20;
      return await this.carModel.findByIdAndUpdate(_id, { carRank: rank });
    });
    await Promise.all(promisedList);
  }

  public async batchTopAgents(): Promise<void> {
    const agents: Member[] = await this.memberModel.find(
      {
        type: Type.AGENT,
        status: Status.ACTIVE,
        rank: 0,
      }
    ).exec();

    const promisedList = agents.map(async (ele: Member) => {
      const { _id, memberCars, likes, articles, views } = ele;
      const rank = memberCars * 100 + articles * 60 + likes * 30 + views * 10;
      return await this.memberModel.findByIdAndUpdate(_id, { memberRank: rank });
    });

    await Promise.all(promisedList);
  }
}
