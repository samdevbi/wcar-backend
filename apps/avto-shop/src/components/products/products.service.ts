import { Model, ObjectId } from 'mongoose';
import { Product, Products } from '../../libs/dto/product/product';
import { InjectModel } from '@nestjs/mongoose';
import { MemberService } from '../member/member.service';
import { AllProductsInquiry, ProductInput, ProductsInquiry, SellerProductsInquiry } from '../../libs/dto/product/product.input';
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Direction, Message } from '../../libs/enums/common.enum';
import { StatisticModifier, T } from '../../libs/types/common';
import { ProductStatus } from '../../libs/enums/product.enum';
import { ProductUpdate } from '../../libs/dto/product/product.update';
import * as moment from 'moment';
import { lookupAuthMemberLiked, lookupMember, shapeIntoMongoObjectId } from '../../libs/config';
import { LikeService } from '../like/like.service';
import { LikeInput } from '../../libs/dto/like/like.input';
import { LikeGroup } from '../../libs/enums/like.enum';

@Injectable()
export class ProductService {
    constructor(@InjectModel('Product') private readonly productModel: Model<Product>,
        private memberService: MemberService,
        private likeService: LikeService,
    ) { }

    public async createProduct(input: ProductInput): Promise<Product> {
        try {
            const result = await this.productModel.create(input);
            await this.memberService.memberStatsEditor({
                _id: result.memberId,
                targetKey: 'sellerProducts',
                modifier: 1,
            });
            return result;
        } catch (err) {
            console.log('Error Product.Model cretaeProduct:', err.message);
            throw new BadRequestException(Message.CREATE_FAILED)
        }
    }

    public async updateProduct(memberId: ObjectId, input: ProductUpdate): Promise<Product> {
        let { productStatus, deletedAt } = input;
        const search: T = {
            _id: input._id,
            memberId: memberId,
            productStatus: ProductStatus.ACTIVE,
        };

        if (productStatus === ProductStatus.DELETE) deletedAt = moment().toDate();

        const result = await this.productModel.findOneAndUpdate(search, input, { new: true }).exec();
        if (!result) throw new InternalServerErrorException(Message.UPDATE_FAILED);

        if (deletedAt) {
            await this.memberService.memberStatsEditor({
                _id: memberId,
                targetKey: 'sellerProducts',
                modifier: -1,
            });
        }
        return result;
    }

    public async likeTargetProduct(memberId: ObjectId, likeRefId: ObjectId): Promise<Product> {
        const target: Product = await this.productModel.findOne({
            _id: likeRefId,
            productStatus: ProductStatus.ACTIVE,
        });
        if (!target) throw new InternalServerErrorException(Message.N0_DATA_FOUND);

        const input: LikeInput = {
            memberId: memberId,
            likeRefId: likeRefId,
            likeGroup: LikeGroup.PRODUCT,
        };

        const modifier: number = await this.likeService.toggleLike(input);
        const result = await this.productStatsEditor({
            _id: likeRefId,
            targetKey: 'productLikes',
            modifier: modifier,
        });

        if (!result) throw new InternalServerErrorException(Message.SOMETHING_WENT_WRONG);
        return result;
    }

    public async getProduct(memberId: ObjectId, productId: ObjectId): Promise<Product> {
        const search: T = {
            _id: productId,
            productStatus: ProductStatus.ACTIVE,
        };
        const targetProduct = await this.productModel.findOne(search).exec();
        if (!targetProduct) throw new InternalServerErrorException(Message.N0_DATA_FOUND);
        return targetProduct;
    }

    public async getProducts(memberId: ObjectId, input: ProductsInquiry): Promise<Products> {
        const match: T = { productStatus: ProductStatus.ACTIVE };
        const sort: T = { [input?.sort ?? 'createdAt']: input?.direction ?? Direction.DESC };

        this.shapeMatchQuery(match, input);
        const result = await this.productModel
            .aggregate([
                { $match: match },
                { $sort: sort },
                {
                    $facet: {
                        list: [
                            { $skip: (input.page - 1) * input.limit },
                            { $limit: input.limit },
                            lookupAuthMemberLiked(memberId),
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

    private shapeMatchQuery(match: T, input: ProductsInquiry): void {
        const {
            memberId,
            typeList,
            priceRange,
            text,
        } = input.search;
        if (memberId) match.memberId = shapeIntoMongoObjectId(memberId);
        if (typeList && typeList.length) match.productType = { $in: typeList };
        if (priceRange) match.priceRange = { $gte: priceRange.minPrice, $lte: priceRange.maxPrice };
        if (text) match.productTitle = { $regex: new RegExp(text, 'i') };
    }

    public async getSellerProducts(memberId: ObjectId, input: SellerProductsInquiry): Promise<Products> {
        const { productStatus } = input.search;
        if (productStatus === ProductStatus.DELETE) throw new InternalServerErrorException(Message.NOT_ALLOWED_REQUEST);

        const match: T = {
            memberId: memberId,
            productStatus: productStatus ?? { $ne: ProductStatus.DELETE },
        };
        const sort: T = { [input?.sort ?? 'createdAt']: input?.direction ?? Direction.DESC };

        const result = await this.productModel.aggregate([
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
        ]).exec();
        if (!result) throw new InternalServerErrorException(Message.N0_DATA_FOUND);

        return result[0];
    }

    public async getAllProductsByAdmin(input: AllProductsInquiry): Promise<Products> {
        const { productStatus, productTypeList, text } = input.search;
        const match: T = {};
        const sort: T = { [input?.sort ?? 'createdAt']: input?.direction ?? Direction.DESC };

        if (productStatus) match.productStatus = productStatus;
        if (productTypeList && productTypeList.length) match.productTypeList = { $in: productTypeList };
        if (text) match.productTitle = { $regex: new RegExp(text, 'i') };

        const result = await this.productModel
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

    public async updateProductByAdmin(input: ProductUpdate): Promise<Product> {
        let { productStatus, deletedAt } = input;
        const search: T = {
            _id: input._id,
            productStatus: ProductStatus.ACTIVE,
        };

        if (productStatus === ProductStatus.DELETE) deletedAt = moment().toDate();

        const result = await this.productModel.findOneAndUpdate(search, input, { new: true }).exec();
        if (!result) throw new InternalServerErrorException(Message.UPDATE_FAILED);

        if (deletedAt) {
            await this.memberService.memberStatsEditor({
                _id: result.memberId,
                targetKey: 'sellerProducts',
                modifier: -1,
            });
        }
        return result;
    }

    public async removeProductByAdmin(productId: ObjectId): Promise<Product> {
        const search: T = { _id: productId, productStatus: ProductStatus.DELETE };
        const result = await this.productModel.findOneAndDelete(search).exec();
        if (!result) throw new InternalServerErrorException(Message.REMOVE_FAILED);
        return result;
    }

    public async productStatsEditor(input: StatisticModifier): Promise<Product> {
        const { _id, targetKey, modifier } = input;
        return await this.productModel.findByIdAndUpdate(
            _id, { $inc: { [targetKey]: modifier } }, { new: true }).exec();
    }

}
