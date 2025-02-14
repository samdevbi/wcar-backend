import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Car, Cars } from '../../libs/dto/car/car';
import { ADCarsInquiry, AllCarsInquiry, CarInput, CarsInquiry, OrdinaryInquiry } from '../../libs/dto/car/car.input';
import { ObjectId } from 'mongoose';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { CarsService } from './cars.service';
import { CarUpdate } from '../../libs/dto/car/car.update';
import { shapeIntoMongoObjectId } from '../../libs/config';
import { WithoutGuard } from '../auth/guards/without.guard';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Type } from '../../libs/enums/member.enum';

@Resolver()
export class CarsResolver {
    constructor(private readonly carsService: CarsService) { }

    @Roles(Type.AGENT, Type.DEALER)
    @UseGuards(RolesGuard)
    @Mutation(() => Car)
    public async createCar(
        @Args('input') input: CarInput,
        @AuthMember('_id') memberId: ObjectId,
    ): Promise<Car> {
        input.memberId = memberId;
        return await this.carsService.createCar(input);
    }

    @Roles(Type.AGENT, Type.DEALER)
    @UseGuards(RolesGuard)
    @Mutation(() => Car)
    public async updateCar(@Args('input') input: CarUpdate,
        @AuthMember('_id') memberId: ObjectId,
    ): Promise<Car> {
        console.log('Mutation: updateCar');
        input._id = shapeIntoMongoObjectId(input._id);
        return await this.carsService.updateCar(memberId, input);
    }

    @UseGuards(WithoutGuard)
    @Query(() => Car)
    public async getCar(
        @Args('carId') input: string,
        @AuthMember('_id') memberId: ObjectId,
    ): Promise<Car> {
        console.log('Query: getCar');
        const carId = shapeIntoMongoObjectId(input);
        return await this.carsService.getCar(memberId, carId);
    }

    @UseGuards(WithoutGuard)
    @Query(() => Cars)
    public async getCars(
        @Args('input') input: CarsInquiry,
        @AuthMember('_id') memberId: ObjectId,
    ): Promise<Cars> {
        console.log('Query: getCars');
        return await this.carsService.getCars(memberId, input);
    }

    @UseGuards(AuthGuard)
    @Query(() => Cars)
    public async getVisited(
        @Args('input') input: OrdinaryInquiry,
        @AuthMember('_id') memberId: ObjectId,
    ): Promise<Cars> {
        console.log('Query: getVisited');
        return await this.carsService.getVisited(memberId, input);

    }

    @UseGuards(AuthGuard)
    @Query(() => Cars)
    public async getLiked(
        @Args('input') input: OrdinaryInquiry,
        @AuthMember('_id') memberId: ObjectId,
    ): Promise<Cars> {
        console.log('Query: getLiked');
        return await this.carsService.getLiked(memberId, input);

    }

    @UseGuards(AuthGuard)
    @Query(() => Cars)
    public async getSaved(
        @Args('input') input: OrdinaryInquiry,
        @AuthMember('_id') memberId: ObjectId,
    ): Promise<Cars> {
        console.log('Query: getSaved');
        return await this.carsService.getSaved(memberId, input);

    }

    @UseGuards(AuthGuard)
    @Mutation(() => Car)
    public async likeTargetCar(
        @Args('carId') input: string,
        @AuthMember('_id') memberId: ObjectId
    ): Promise<Car> {
        console.log("Mutation: likeTargetCar ");
        const likeRefId = shapeIntoMongoObjectId(input);
        return await this.carsService.likeTargetCar(memberId, likeRefId);
    }

    @UseGuards(AuthGuard)
    @Mutation(() => Car)
    public async saveTargetCar(
        @Args('carId') input: string,
        @AuthMember('_id') memberId: ObjectId
    ): Promise<Car> {
        console.log("Mutation: saveTargetCar");
        const likeRefId = shapeIntoMongoObjectId(input);
        return await this.carsService.saveTargetCar(memberId, likeRefId);
    }

    @Roles(Type.AGENT, Type.DEALER)
    @UseGuards(RolesGuard)
    @Query(() => Cars)
    public async getAgentDealerCars(
        @Args('input') input: ADCarsInquiry,
        @AuthMember('_id') memberId: ObjectId,
    ): Promise<Cars> {
        console.log('Query: getAgentDealerCars');
        return await this.carsService.getAgentDealerCars(memberId, input);
    }

    @Roles(Type.ADMIN)
    @UseGuards(RolesGuard)
    @Query(() => Cars)
    public async getAllCarsByAdmin(
        @Args('input') input: AllCarsInquiry,
        @AuthMember('_id') memberId: ObjectId,
    ): Promise<Cars> {
        console.log('Query: getAllCarsByAdmin');
        return await this.carsService.getAllCarsByAdmin(input);
    }

    @Roles(Type.ADMIN)
    @UseGuards(RolesGuard)
    @Mutation(() => Car)
    public async updateCarByAdmin(
        @Args('input') input: CarUpdate,
    ): Promise<Car> {
        console.log('Mutation: updateCarByAdmin');
        input._id = shapeIntoMongoObjectId(input._id);
        return await this.carsService.updateCarByAdmin(input);
    }

    @Roles(Type.ADMIN)
    @UseGuards(RolesGuard)
    @Mutation(() => Car)
    public async removeCarByAdmin(
        @Args('carId') input: string,
    ): Promise<Car> {
        console.log('Mutation: removeCarByAdmin');
        const productId = shapeIntoMongoObjectId(input);
        return await this.carsService.removeCarByAdmin(productId);
    }

}
