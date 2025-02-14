import { Field, ObjectType } from "@nestjs/graphql";
import { ObjectId } from "mongoose";
import { NotificationGroup, NotificationStatus, NotificationType } from "../../enums/notification.enum";
import { Member, TotalCounter } from "../member/member";
import { Car } from "../car/car";
import { Article } from "../article/article";
import { Comment } from "../comment/comment";



@ObjectType()
export class Notification {
    @Field(() => String)
    _id: ObjectId;

    @Field(() => NotificationType)
    notificationType: NotificationType;

    @Field(() => NotificationStatus)
    notificationStatus: NotificationStatus;

    @Field(() => NotificationGroup)
    notificationGroup: NotificationGroup;

    @Field(() => String)
    authorId: ObjectId;

    @Field(() => String, { nullable: true })
    receiverId?: ObjectId;

    @Field(() => String, { nullable: true })
    carId?: ObjectId;

    @Field(() => String, { nullable: true })
    articleId?: ObjectId;

    @Field(() => String, { nullable: true })
    commentId?: ObjectId;

    @Field(() => Member, { nullable: true })
    creatorData?: Member;

    @Field(() => Car, { nullable: true })
    carData?: Car;

    @Field(() => Article, { nullable: true })
    articleData?: Article;

    @Field(() => Comment, { nullable: true })
    commentData?: Comment;

    @Field(() => Date,)
    createdAt: Date;

    @Field(() => Date)
    updatedAt: Date;
};

@ObjectType()
export class Notifications {
    @Field(() => [Notification])
    list: Notification[];

    @Field(() => [TotalCounter], { nullable: true })
    metaCounter: TotalCounter[];
}