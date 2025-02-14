import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { NotificationService } from './notification.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { NotificationInput, NotificationInquiry } from '../../libs/dto/notification/notification.input';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { ObjectId } from 'mongoose';
import { Notification, Notifications } from '../../libs/dto/notification/notification';
import { NotificationUpdate } from '../../libs/dto/notification/notification.update.ts';
import { shapeIntoMongoObjectId } from '../../libs/config';

@Resolver()
export class NotificationResolver {
    constructor(private readonly notificationService: NotificationService) { }

    @UseGuards(AuthGuard)
    @Mutation(() => Notification)
    public async createNotification(
        @Args('input') input: NotificationInput,
        @AuthMember('_id') memberId: ObjectId,
    ): Promise<Notification | string> {
        console.log('Mutation: createNotification');
        return await this.notificationService.createNotification(memberId, input);
    }

    @UseGuards(AuthGuard)
    @Mutation(() => Notification)
    public async updateNotification(
        @Args('input') input: NotificationUpdate,
        @AuthMember('_id') memberId: ObjectId,
    ): Promise<Notification> {
        console.log('Mutation: updateNotification');
        return await this.notificationService.updateNotification(memberId, input);
    }

    @UseGuards(AuthGuard)
    @Mutation(() => Notification)
    public async getNotification(
        @Args('input') input: string,
        @AuthMember('_id') memberId: ObjectId,
    ): Promise<Notification> {
        console.log('Mutation: getNotification');
        const notificationId = shapeIntoMongoObjectId(input)
        return await this.notificationService.getNotification(memberId, notificationId);
    }

    @UseGuards(AuthGuard)
    @Query(() => Notifications)
    public async getNotifications(
        @Args('input') input: NotificationInquiry,
        @AuthMember('_id') memberId: ObjectId,
    ): Promise<Notifications> {
        console.log('Query: getNotifications');
        return await this.notificationService.getNotifications(memberId, input);
    }

}
