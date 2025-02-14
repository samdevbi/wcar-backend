import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Notice, Notices } from '../../libs/dto/notice/notice';
import { MemberService } from '../member/member.service';
import { NoticeInput, NoticesInquiry } from '../../libs/dto/notice/notice.input';
import { Direction, Message } from '../../libs/enums/common.enum';
import { NoticeUpdate } from '../../libs/dto/notice/notice.update';
import { NoticeStatus } from '../../libs/enums/notice.enum';
import { T } from '../../libs/types/common';

@Injectable()
export class NoticeService {
    constructor(@InjectModel('Notice') private readonly noticeModel: Model<Notice>,
        private readonly memberService: MemberService,
    ) { }

    public async createNotice(memberId: ObjectId, input: NoticeInput): Promise<Notice> {
        input.memberId = memberId;
        try {
            const result = await this.noticeModel.create(input);
            if (!result) throw new BadRequestException(Message.CREATE_FAILED);
            return result;

        } catch (err) {
            console.log('Error Notice.Model createNotice:', err.message);
            throw new BadRequestException(Message.CREATE_FAILED)
        }
    }

    public async updateNotice(memberId: ObjectId, input: NoticeUpdate): Promise<Notice> {
        const search: T = {
            _id: input._id,
            memberId: memberId,
        };

        const result = await this.noticeModel.findOneAndUpdate(search, input, { new: true }).exec();
        if (!result) throw new InternalServerErrorException(Message.UPDATE_FAILED);
        return result;
    }

    public async getNotice(memberId: ObjectId, noticeId: ObjectId): Promise<Notice> {
        const search: T = {
            _id: noticeId,
        };

        const result = await this.noticeModel.findOne(search).exec();
        if (!result) throw new InternalServerErrorException(Message.N0_DATA_FOUND);
        return result;
    }

    public async getNotices(memberId: ObjectId, input: NoticesInquiry): Promise<Notices> {
        const match: T = {};
        const sort: T = { [input?.sort ?? 'createdAt']: input?.direction ?? Direction.DESC };

        this.shapeMatchQuery(match, input);
        const result = await this.noticeModel
            .aggregate([
                { $match: match },
                { $sort: sort },
                {
                    $facet: {
                        list: [
                            { $skip: (input.page - 1) * input.limit },
                            { $limit: input.limit },
                        ],
                        metaCounter: [{ $count: 'total' }],
                    },
                },
            ])
            .exec();
        if (!result.length) throw new InternalServerErrorException(Message.N0_DATA_FOUND);

        return result[0];
    }

    private shapeMatchQuery(match: T, input: NoticesInquiry): void {
        const {
            noticeCategory,
            noticeGroup,
            noticeStatus
        } = input.search;
        if (noticeCategory) match.noticeCategory = noticeCategory;
        if (noticeGroup) match.noticeGroup = noticeGroup;
        if (noticeStatus) match.noticeStatus = noticeStatus;
    }


}
