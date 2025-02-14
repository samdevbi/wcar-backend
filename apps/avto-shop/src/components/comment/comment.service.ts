import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { MemberService } from '../member/member.service';
import { ProductService } from '../products/products.service';
import { Direction, Message } from '../../libs/enums/common.enum';
import { CommentInput, CommentsInquiry } from '../../libs/dto/comment/comment.input';
import { CommentGroup, CommentStatus } from '../../libs/enums/comment.enum';
import { CarsService } from '../cars/cars.service';
import { CommentUpdate } from '../../libs/dto/comment/comment.update';
import { Comment, Comments } from '../../libs/dto/comment/comment';
import { T } from '../../libs/types/common';
import { lookupMember } from '../../libs/config';
import { ArticleService } from '../article/article.service';

@Injectable()
export class CommentService {
    constructor(
        @InjectModel('Comment') private readonly commentModel: Model<Comment>,
        private readonly memberService: MemberService,
        private readonly articleService: ArticleService,
        private readonly productService: ProductService,
        private readonly carsService: CarsService,
    ) { }

    public async createComment(memberId: ObjectId, input: CommentInput): Promise<Comment> {
        input.memberId = memberId;
        let result = null;

        try {
            result = await this.commentModel.create(input);
        } catch (err) {
            console.log('Error on createComment', err.message);
            throw new BadRequestException(Message.CREATE_FAILED);
        }

        switch (input.commentGroup) {
            case CommentGroup.CAR:
                await this.carsService.carStatsEditor({
                    _id: input.commentRefId,
                    targetKey: 'carComments',
                    modifier: 1,
                });
                break;
            case CommentGroup.PRODUCT:
                await this.productService.productStatsEditor({
                    _id: input.commentRefId,
                    targetKey: 'productComments',
                    modifier: 1,
                });
                break;
            case CommentGroup.ARTICLE:
                await this.articleService.boardArticleStatsEditor({
                    _id: input.commentRefId,
                    targetKey: 'articleComments',
                    modifier: 1,
                });
                break;

            case CommentGroup.MEMBER:
                await this.memberService.memberStatsEditor({
                    _id: input.commentRefId,
                    targetKey: 'memberComments',
                    modifier: 1,
                });
                break;
        }

        if (!result) throw new InternalServerErrorException(Message.CREATE_FAILED);

        return result;
    }

    public async updateComment(memberId: ObjectId, input: CommentUpdate): Promise<Comment> {
        const { _id } = input;

        const result = await this.commentModel.findOneAndUpdate(
            {
                _id: _id,
                memberId: memberId,
                commentStatus: CommentStatus.ACTIVE,
            },
            input,
            { new: true },
        ).exec();
        if (!result) throw new InternalServerErrorException(Message.UPDATE_FAILED);
        return result;
    }

    public async getComments(memberId: ObjectId, input: CommentsInquiry): Promise<Comments> {
        const { commentRefId } = input.search;
        const match: T = { commentRefId: commentRefId, commentStatus: CommentStatus.ACTIVE };
        const sort: T = { [input?.sort ?? 'createdAt']: input?.direction ?? Direction.DESC };

        const result: Comments[] = await this.commentModel
            .aggregate([
                { $match: match },
                { $sort: sort },
                {
                    $facet: {
                        list: [
                            { $skip: (input.page - 1) * input.limit },
                            { $limit: input.limit },
                            lookupMember,
                            { $unwind: '$creatorData' },
                        ],
                        metaCounter: [{ $count: 'total' }],
                    },
                },
            ])
            .exec();
        if (!result.length) throw new InternalServerErrorException(Message.N0_DATA_FOUND);

        return result[0];
    }

    public async removeCommentByAdmin(input: ObjectId): Promise<Comment> {
        const result = await this.commentModel.findByIdAndDelete(input).exec();
        if (!result) throw new InternalServerErrorException(Message.REMOVE_FAILED);
        return result;
    }
}
