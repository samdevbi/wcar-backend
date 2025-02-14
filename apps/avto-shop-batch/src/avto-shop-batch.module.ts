import { Module } from '@nestjs/common';
import { AvtoShopBatchController } from './avto-shop-batch.controller';
import { AvtoShopBatchService } from './avto-shop-batch.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import CarSchema from 'apps/avto-shop/src/schemas/Car.model';
import MemberSchema from 'apps/avto-shop/src/schemas/Member.model';

@Module({
  imports: [ConfigModule.forRoot(),
    DatabaseModule,
  ScheduleModule.forRoot(),
  MongooseModule.forFeature([{ name: 'Car', schema: CarSchema }]),
  MongooseModule.forFeature([{ name: 'Member', schema: MemberSchema }]),
  ],
  controllers: [AvtoShopBatchController],
  providers: [AvtoShopBatchService],
})
export class AvtoShopBatchModule { }
