import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { NotificationInput, NotificationInquiry, ToggleNotificate } from "../../libs/dto/notification/notification.input";
import { T } from "../../libs/types/common";
import { Direction, Message } from "../../libs/enums/common.enum";
import { lookupArticle, lookupAuthor, lookupCar, lookupComment, lookupMember, shapeIntoMongoObjectId } from "../../libs/config";
import { Notification, Notifications } from "../../libs/dto/notification/notification";
import { NotificationUpdate } from "../../libs/dto/notification/notification.update.ts";
import { NotificationGroup, NotificationStatus } from "../../libs/enums/notification.enum";

@Injectable()
export class NotificationService {
    constructor(@InjectModel("Notification") private readonly notificationModel: Model<Notification>,
    ) { }

    public async createNotification(memberId: ObjectId, input: NotificationInput): Promise<Notification | string> {

        const {
            receiverId,
            carId,
            articleId,
            commentId,
            authorId
        } = input;
        if (carId) input.carId = shapeIntoMongoObjectId(carId);
        if (receiverId) input.receiverId = shapeIntoMongoObjectId(receiverId);
        if (articleId) input.articleId = shapeIntoMongoObjectId(articleId);
        if (commentId) input.commentId = shapeIntoMongoObjectId(commentId);
        if (authorId) input.authorId = shapeIntoMongoObjectId(authorId);

        if (memberId === input.receiverId) {
            throw new InternalServerErrorException(Message.SELF_MESSAGE_DENIED);
        }

        const search: T = {
            notificationGroup: input.notificationGroup,
            notificationType: input.notificationType,
            authorId: input.authorId,
            receiverId: input.receiverId,
            ...(input.carId && { carId: input.carId }),
            ...(input.articleId && { articleId: input.articleId }),
            ...(input.commentId && { comentId: input.commentId }),
        },
            exist = await this.notificationModel.findOne(search).exec();
        if (exist) {
            const result = await this.notificationModel.findOneAndDelete(search).exec();
            return result;
        } else {
            try {
                const result = await this.notificationModel.create(input);
                return result;
            } catch (err) {
                throw new InternalServerErrorException(Message.CREATE_FAILED);
            }
        }
    }

    public async updateNotification(memberId: ObjectId, input: NotificationUpdate): Promise<Notification> {
        input._id = shapeIntoMongoObjectId(input?._id)
        const search: T = {
            _id: input._id,
            receiverId: memberId,
            notificationStatus: NotificationStatus.WAIT,
        };

        const result = await this.notificationModel.findOneAndUpdate(search, input, { new: true }).exec();
        if (!result) throw new InternalServerErrorException(Message.UPDATE_FAILED);

        return result;
    }

    public async getNotification(memberId: ObjectId, notificationId: ObjectId): Promise<Notification> {
        const search: T = {
            _id: notificationId,
            receiverId: memberId,
            notificationStatus: NotificationStatus.READ
        };
        const targetNotification = await this.notificationModel.findOne(search).exec();
        if (!targetNotification) throw new InternalServerErrorException(Message.N0_DATA_FOUND);
        return targetNotification;
    }

    public async getNotifications(memberId: ObjectId, input: NotificationInquiry): Promise<Notifications> {

        const match: T = {
            receiverId: memberId,
            ...(input?.notificationStatus ? { notificationStatus: input.notificationStatus } : {})
        };
        const sort: T = {
            [input?.sort ?? 'createdAt']: input?.direction ?? Direction.DESC
        };
        const result = await this.notificationModel
            .aggregate([
                { $match: match },
                { $sort: sort },
                {
                    $facet: {
                        list: [
                            { $skip: (input.page - 1) * input.limit },
                            { $limit: input.limit },
                            lookupAuthor,
                            { $unwind: { path: '$creatorData', preserveNullAndEmptyArrays: true } },
                            lookupCar,
                            { $unwind: { path: '$carData', preserveNullAndEmptyArrays: true } },
                            lookupArticle,
                            { $unwind: { path: '$articleData', preserveNullAndEmptyArrays: true } },
                            lookupComment,
                            { $unwind: { path: '$commentData', preserveNullAndEmptyArrays: true } },
                        ],
                        metaCounter: [{ $count: 'total' }],
                    },
                },
            ])
            .exec();
        if (!result.length) throw new InternalServerErrorException(Message.N0_DATA_FOUND);

        return result[0];
    }
}
