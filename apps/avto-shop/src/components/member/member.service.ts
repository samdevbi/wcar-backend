import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Member, Members } from '../../libs/dto/member/member';
import { Follower, Following, MeFollowed } from '../../libs/dto/follow/follow';
import { AuthService } from '../auth/auth.service';
import { ViewService } from '../view/view.service';
import { LikeService } from '../like/like.service';
import { ADSInquiry, LoginInput, MemberInput, MembersInquiry } from '../../libs/dto/member/member.input';
import { Direction, Message } from '../../libs/enums/common.enum';
import { MemberUpdate } from '../../libs/dto/member/member.update';
import { ViewGroup } from '../../libs/enums/view.enum';
import { LikeGroup } from '../../libs/enums/like.enum';
import { StatisticModifier, T } from '../../libs/types/common';
import { lookupAuthMemberLiked } from '../../libs/config';
import { LikeInput } from '../../libs/dto/like/like.input';
import { Status, Type } from '../../libs/enums/member.enum';

@Injectable()
export class MemberService {
    constructor(
        @InjectModel('Member') private readonly memberModel: Model<Member>,
        @InjectModel('Follow') private readonly followModel: Model<Follower | Following>,
        private authService: AuthService,
        private viewService: ViewService,
        private likeService: LikeService,
    ) { }


    public async signup(input: MemberInput): Promise<Member> {
        input.password = await this.authService.hashPassword(input.password);
        try {
            const result = await this.memberModel.create(input);
            result.accessToken = await this.authService.createToken(result);
            return result;
        } catch (err) {
            console.log("Error Service.Model signup:", err.message);
            throw new BadRequestException(Message.USED_MEMBER_NICK_OR_PHONE);
        }
    };

    public async login(input: LoginInput): Promise<Member> {
        const { titleNick, password } = input;
        const response: Member = await this.memberModel
            .findOne({ titleNick: titleNick })
            .select('+password')
            .exec();

        if (!response || response.status === Status.DELETE) {
            throw new InternalServerErrorException(Message.NO_MEMBER_NICK);
        } else if (response.status === Status.BLOCK) {
            throw new InternalServerErrorException(Message.BLOCKED_USER);
        };

        const isMatch = await this.authService.comparePassword(input.password, response.password);
        if (!isMatch) throw new InternalServerErrorException(Message.WRONG_PASSWORD);

        response.accessToken = await this.authService.createToken(response);
        return response;
    };

    public async updateMember(memberId: ObjectId, input: MemberUpdate): Promise<Member> {
        if (input.phone2 === "") {
            delete input.phone2;
        }
        const result: Member = await this.memberModel.findOneAndUpdate({
            _id: memberId,
            status: Status.ACTIVE,
        }, input, { new: true }).exec();
        if (!result) throw new InternalServerErrorException(Message.UPDATE_FAILED);
        result.accessToken = await this.authService.createToken(result);
        return result;
    };

    public async getMember(memberId: ObjectId, targetId: ObjectId): Promise<Member> {
        const search: T = {
            _id: targetId,
            status: Status.ACTIVE
        };
        const targetMember = await this.memberModel.findOne(search).lean().exec() as Member;
        if (!targetMember) throw new InternalServerErrorException(Message.N0_DATA_FOUND);
        if (memberId) {
            const viewInput = { memberId: memberId, viewRefId: targetId, viewGroup: ViewGroup.MEMBER };
            const newview = await this.viewService.recordView(viewInput);
            if (newview) {
                await this.memberModel.findOneAndUpdate(search, { $inc: { views: 1 } }, { new: true }).exec();
                targetMember.views++;
            }

            const likeInput = { memberId: memberId, likeRefId: targetId, likeGroup: LikeGroup.MEMBER };
            (targetMember as any).meLiked = await this.likeService.checkLikeExistence(likeInput);

            (targetMember as any).meFollowed = await this.checkSubscription(memberId, targetId);
        }
        return targetMember;
    };

    private async checkSubscription(followerId: ObjectId, followingId: ObjectId): Promise<MeFollowed[]> {
        const result = await this.followModel.findOne({
            followerId: followerId,
            followingId: followingId,
        }).exec();
        return result ? [{ followerId: followerId, followingId: followingId, myFollowing: true }] : [];
    }

    public async getAgents(memberId: ObjectId, input: ADSInquiry): Promise<Members> {
        const { text } = input.search;
        const match: T = { type: Type.AGENT, status: Status.ACTIVE };
        const sort: T = { [input?.sort ?? 'createdAt']: input?.direction ?? Direction.DESC };

        if (text) match.titleNick = { $regex: new RegExp(text, 'i') };
        console.log('match:', match);

        const result = await this.memberModel
            .aggregate([
                { $match: match },
                { $sort: sort },
                {
                    $facet: {
                        list: [{ $skip: (input.page - 1) * input.limit },
                        { $limit: input.limit },
                        lookupAuthMemberLiked(memberId),
                        ],
                        metaCounter: [{ $count: 'total' }],
                    },
                },
            ])
            .exec();
        if (!result.length) throw new InternalServerErrorException(Message.N0_DATA_FOUND);

        return result[0];
    }

    public async getDealers(memberId: ObjectId, input: ADSInquiry): Promise<Members> {
        const { text } = input.search;
        const match: T = { type: Type.DEALER, status: Status.ACTIVE };
        const sort: T = { [input?.sort ?? 'createdAt']: input?.direction ?? Direction.DESC };

        if (text) match.titleNick = { $regex: new RegExp(text, 'i') };
        console.log('match:', match);

        const result = await this.memberModel
            .aggregate([
                { $match: match },
                { $sort: sort },
                {
                    $facet: {
                        list: [{ $skip: (input.page - 1) * input.limit },
                        { $limit: input.limit },
                        lookupAuthMemberLiked(memberId),
                        ],
                        metaCounter: [{ $count: 'total' }],
                    },
                },
            ])
            .exec();
        if (!result.length) throw new InternalServerErrorException(Message.N0_DATA_FOUND);

        return result[0];
    };

    public async getServices(memberId: ObjectId, input: ADSInquiry): Promise<Members> {
        const { text } = input.search;
        const match: T = { type: Type.SERVICE, status: Status.ACTIVE };
        const sort: T = { [input?.sort ?? 'createdAt']: input?.direction ?? Direction.DESC };

        if (text) match.titleNick = { $regex: new RegExp(text, 'i') };
        console.log('match:', match);

        const result = await this.memberModel
            .aggregate([
                { $match: match },
                { $sort: sort },
                {
                    $facet: {
                        list: [{ $skip: (input.page - 1) * input.limit },
                        { $limit: input.limit },
                        lookupAuthMemberLiked(memberId),
                        ],
                        metaCounter: [{ $count: 'total' }],
                    },
                },
            ])
            .exec();
        if (!result.length) throw new InternalServerErrorException(Message.N0_DATA_FOUND);

        return result[0];
    };

    public async likeTargetMember(memberId: ObjectId, likeRefId: ObjectId): Promise<Member> {
        const target: Member = await this.memberModel.findOne({ _id: likeRefId, status: Status.ACTIVE });
        if (!target) throw new InternalServerErrorException(Message.N0_DATA_FOUND);

        const input: LikeInput = {
            memberId: memberId,
            likeRefId: likeRefId,
            likeGroup: LikeGroup.MEMBER
        };
        let modifier: number = await this.likeService.toggleLike(input);
        const result = this.memberStatsEditor({ _id: likeRefId, targetKey: 'likes', modifier: modifier });

        if (!result) throw new InternalServerErrorException(Message.SOMETHING_WENT_WRONG);

        return result;
    }

    public async getAllMembersByAdmin(input: MembersInquiry): Promise<Members> {
        const { status, type, text } = input.search;
        const match: T = {};
        const sort: T = { [input?.sort ?? 'createdAt']: input?.direction ?? Direction.DESC };

        if (status) match.status = status;
        if (type) match.type = type;
        if (text) match.titleNick = { $regex: new RegExp(text, 'i') };
        console.log('match:', match);

        const result = await this.memberModel
            .aggregate([
                { $match: match },
                { $sort: sort },
                {
                    $facet: {
                        list: [{ $skip: (input.page - 1) * input.limit }, { $limit: input.limit }],
                        metaCounter: [{ $count: 'total' }],
                    },
                },
            ])
            .exec();
        if (!result.length) throw new InternalServerErrorException(Message.N0_DATA_FOUND);

        return result[0];
    };

    public async updateMemberByAdmin(input: MemberUpdate): Promise<Member> {
        const result = await this.memberModel.findOneAndUpdate({ _id: input._id }, input, { new: true }).exec();
        if (!result) throw new InternalServerErrorException(Message.UPDATE_FAILED);
        return result;
    };

    public async memberStatsEditor(input: StatisticModifier): Promise<Member> {
        const { _id, targetKey, modifier } = input;
        return this.memberModel.findByIdAndUpdate(_id, { $inc: { [targetKey]: modifier } }, { new: true }).exec();
    }
}
