import { Field, InputType, Int } from "@nestjs/graphql";
import { IsIn, IsNotEmpty, IsOptional, Min } from "class-validator";
import { NotificationGroup, NotificationStatus, NotificationType } from "../../enums/notification.enum";
import { ObjectId } from "mongoose";
import { Direction } from "../../enums/common.enum";
import { availableNotifSorts } from "../../config";




@InputType()
export class NotificationInput {
    @IsNotEmpty()
    @Field(() => NotificationType)
    notificationType: NotificationType;

    @IsNotEmpty()
    @Field(() => NotificationGroup)
    notificationGroup: NotificationGroup;

    @IsNotEmpty()
    @Field(() => String)
    authorId: ObjectId;

    @IsOptional()
    @Field(() => String, { nullable: true })
    receiverId?: ObjectId;

    @IsOptional()
    @Field(() => String, { nullable: true })
    carId?: ObjectId;

    @IsOptional()
    @Field(() => String, { nullable: true })
    articleId?: ObjectId;

    @IsOptional()
    @Field(() => String, { nullable: true })
    commentId?: ObjectId;

}

@InputType()
export class ToggleNotificate {
    @IsNotEmpty()
    @Field(() => NotificationType)
    notificationType: NotificationType;

    @IsNotEmpty()
    @Field(() => NotificationGroup)
    notificationGroup: NotificationGroup;

    @IsOptional()
    @Field(() => String, { nullable: true })
    carId?: ObjectId;

    @IsOptional()
    @Field(() => String, { nullable: true })
    articleId?: ObjectId;

    @IsOptional()
    @Field(() => String, { nullable: true })
    comentId?: ObjectId;

    @IsOptional()
    @Field(() => String, { nullable: true })
    authorId?: ObjectId;

    @IsOptional()
    @Field(() => String, { nullable: true })
    receiverId?: ObjectId;

}

@InputType()
export class NotificationInquiry {
    @IsNotEmpty()
    @Min(1)
    @Field(() => Int)
    page: number;

    @IsNotEmpty()
    @Min(1)
    @Field(() => Int)
    limit: number;

    @IsOptional()
    @IsIn(availableNotifSorts)
    @Field(() => String, { nullable: true })
    sort?: string;

    @IsOptional()
    @Field(() => Direction, { nullable: true })
    direction?: Direction;

    @IsOptional()
    @Field(() => NotificationStatus, { nullable: true })
    notificationStatus?: NotificationStatus;
}