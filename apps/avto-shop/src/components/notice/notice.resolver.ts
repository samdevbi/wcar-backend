import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { NoticeService } from './notice.service';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Type } from '../../libs/enums/member.enum';
import { Notice, Notices } from '../../libs/dto/notice/notice';
import { NoticeInput, NoticesInquiry } from '../../libs/dto/notice/notice.input';
import { ObjectId } from 'mongoose';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { NoticeUpdate } from '../../libs/dto/notice/notice.update';
import { shapeIntoMongoObjectId } from '../../libs/config';
import { WithoutGuard } from '../auth/guards/without.guard';

@Resolver()
export class NoticeResolver {
    constructor(private readonly noticeService: NoticeService) { }


    @Roles(Type.ADMIN)
    @UseGuards(RolesGuard)
    @Mutation(() => Notice)
    public async createNotice(
        @Args('input') input: NoticeInput,
        @AuthMember('_id') memberId: ObjectId,
    ): Promise<Notice> {
        console.log('Mutation: createNotice');
        return await this.noticeService.createNotice(memberId, input);
    }

    @Roles(Type.ADMIN)
    @UseGuards(RolesGuard)
    @Mutation(() => Notice)
    public async updateNotice(
        @Args('input') input: NoticeUpdate,
        @AuthMember('_id') memberId: ObjectId,
    ): Promise<Notice> {
        console.log('Mutation: updateNotice');
        return await this.noticeService.updateNotice(memberId, input);
    }

    @Roles(Type.ADMIN)
    @UseGuards(RolesGuard)
    @Query(() => Notice)
    public async getNotice(
        @Args('input') input: String,
        @AuthMember('_id') memberId: ObjectId,
    ): Promise<Notice> {
        console.log('Mutation: getNotice');
        const noticeId = shapeIntoMongoObjectId(input)
        return await this.noticeService.getNotice(memberId, noticeId);
    }

    @UseGuards(WithoutGuard)
    @Query(() => Notices)
    public async getNotices(
        @Args('input') input: NoticesInquiry,
        @AuthMember('_id') memberId: ObjectId,
    ): Promise<Notices> {
        console.log('Query: getNotices');
        return await this.noticeService.getNotices(memberId, input);
    }
}
