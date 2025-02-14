import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MemberService } from './member.service';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { Member, Members } from '../../libs/dto/member/member';
import { ADSInquiry, LoginInput, MemberInput, MembersInquiry } from '../../libs/dto/member/member.input';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { Type } from '../../libs/enums/member.enum';
import { MemberUpdate } from '../../libs/dto/member/member.update';
import { ObjectId } from 'mongoose';
import { WithoutGuard } from '../auth/guards/without.guard';
import { getSerialForImage, shapeIntoMongoObjectId, validMimeTypes } from '../../libs/config';
import { RolesGuard } from '../auth/guards/roles.guard';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { Message } from '../../libs/enums/common.enum';
import { createWriteStream } from 'fs';

@Resolver()
export class MemberResolver {
    constructor(private readonly memberService: MemberService) { }

    @Mutation(() => Member)
    public async signup(@Args('input') input: MemberInput): Promise<Member> {
        console.log('Mutation: signup');
        console.log('input', input);
        return await this.memberService.signup(input);
    };

    @Mutation(() => Member)
    public async login(@Args('input') input: LoginInput): Promise<Member> {
        console.log('Mutation: login');
        return await this.memberService.login(input);
    };

    @UseGuards(AuthGuard)
    @Query(() => String)
    public async checkAuth(@AuthMember('memberNick') memberNick: string): Promise<string> {
        console.log("Query checkAuth");
        console.log("MemberNick:", memberNick);
        return await `Hi ${memberNick}`;
    };

    @Roles(Type.USER, Type.AGENT, Type.DEALER, Type.SELLER, Type.SERVICE, Type.ADMIN)
    @UseGuards(AuthGuard)
    @Query(() => String)
    public async checkAuthRoles(@AuthMember() authMember: Member): Promise<string> {
        console.log("Query checkAuth");
        console.log("MemberNick:",);
        return await `Hi ${authMember.titleNick}, you are ${authMember.titleNick} (memberId: ${authMember._id})`;
    };

    @UseGuards(AuthGuard)
    @Mutation(() => Member)
    public async updateMember(
        @Args('input') input: MemberUpdate,
        @AuthMember('_id') memberId: ObjectId,
    ): Promise<Member> {
        console.log('Mutation: updateMember');
        return await this.memberService.updateMember(memberId, input);
    };

    @UseGuards(WithoutGuard)
    @Query(() => Member)
    public async getMember(
        @Args('memberId') input: string,
        @AuthMember('_id') memberId: ObjectId
    ): Promise<Member> {
        console.log('Query: getMember');
        const targetId = shapeIntoMongoObjectId(input);
        return await this.memberService.getMember(memberId, targetId);
    };

    @UseGuards(WithoutGuard)
    @Query(() => Members)
    public async getAgents(@Args('input') input: ADSInquiry, @AuthMember('_id') memberId: ObjectId): Promise<Members> {
        console.log('Query: getAgents');
        return await this.memberService.getAgents(memberId, input);
    };

    @UseGuards(WithoutGuard)
    @Query(() => Members)
    public async getServices(@Args('input') input: ADSInquiry, @AuthMember('_id') memberId: ObjectId): Promise<Members> {
        console.log('Query: getServices');
        return await this.memberService.getServices(memberId, input);
    };

    @UseGuards(WithoutGuard)
    @Query(() => Members)
    public async getDealers(@Args('input') input: ADSInquiry, @AuthMember('_id') memberId: ObjectId): Promise<Members> {
        console.log('Query: getDealers');
        return await this.memberService.getDealers(memberId, input);
    };

    @UseGuards(AuthGuard)
    @Mutation(() => Member)
    public async likeTargetMember(
        @Args('memberId') input: string,
        @AuthMember('_id') memberId: ObjectId
    ): Promise<Member> {
        console.log("Mutation: likeTargetMember ");
        const likeRefId = shapeIntoMongoObjectId(input);
        return await this.memberService.likeTargetMember(memberId, likeRefId);
    }

    /* ADMIN */

    // Authorization: ADMIN
    @Roles(Type.ADMIN)
    @UseGuards(RolesGuard)
    @Query(() => Members)
    public async getAllMembersByAdmin(@Args('input') input: MembersInquiry): Promise<Members> {
        console.log('Mutation: getMembersByAdmin');
        return await this.memberService.getAllMembersByAdmin(input);
    };

    // Authorization: ADMIN
    @Roles(Type.ADMIN)
    @UseGuards(RolesGuard)
    @Mutation(() => Member)
    public async updateMemberByAdmin(@Args('input') input: MemberUpdate): Promise<Member> {
        console.log('Mutation: updateMemberByAdmin');
        return await this.memberService.updateMemberByAdmin(input);
    };

    /* Uploader */

    @UseGuards(AuthGuard)
    @Mutation((returns) => String)
    public async imageUploader(
        @Args({ name: 'file', type: () => GraphQLUpload })
        { createReadStream, filename, mimetype }: FileUpload,
        @Args('target') target: String,
    ): Promise<string> {
        console.log('Mutation: imageUploader');

        if (!filename) throw new BadRequestException(Message.UPLOAD_FAILED);
        const validMime = validMimeTypes.includes(mimetype);
        if (!validMime) throw new BadRequestException(Message.PROVIDE_ALLOWED_FORMAT);

        const imageName = getSerialForImage(filename);
        const url = `uploads/${target}/${imageName}`;
        const stream = createReadStream();

        const result = await new Promise((resolve, reject) => {
            stream
                .pipe(createWriteStream(url))
                .on('finish', async () => resolve(true))
                .on('error', () => reject(false));
        });
        if (!result) throw new BadRequestException(Message.UPLOAD_FAILED);

        return url;
    }

    @UseGuards(AuthGuard)
    @Mutation((returns) => [String])
    public async imagesUploader(
        @Args('files', { type: () => [GraphQLUpload] })
        files: Promise<FileUpload>[],
        @Args('target') target: String,
    ): Promise<string[]> {
        console.log('Mutation: imagesUploader');

        const uploadedImages = [];
        const promisedList = files.map(async (img: Promise<FileUpload>, index: number): Promise<Promise<void>> => {
            try {
                const { filename, mimetype, encoding, createReadStream } = await img;

                const validMime = validMimeTypes.includes(mimetype);
                if (!validMime) throw new BadRequestException(Message.PROVIDE_ALLOWED_FORMAT);

                const imageName = getSerialForImage(filename);
                const url = `uploads/${target}/${imageName}`;
                const stream = createReadStream();

                const result = await new Promise((resolve, reject) => {
                    stream
                        .pipe(createWriteStream(url))
                        .on('finish', () => resolve(true))
                        .on('error', () => reject(false));
                });
                if (!result) throw new BadRequestException(Message.UPLOAD_FAILED);

                uploadedImages[index] = url;
            } catch (err) {
                console.log('Error, file missing!');
            }
        });

        await Promise.all(promisedList);
        return uploadedImages;
    }
}
