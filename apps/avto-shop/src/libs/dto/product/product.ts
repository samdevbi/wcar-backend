import { Field, Int, ObjectType } from "@nestjs/graphql";
import { ObjectId } from "mongoose";
import { ProductStatus, ProductType } from "../../enums/product.enum";
import { Member, TotalCounter } from "../member/member";
import { MeLiked } from "../like/like";
import { MeSaved } from "../save/save";



@ObjectType()
export class Product {

    @Field(() => String)
    _id: ObjectId;

    @Field(() => ProductType)
    productType: ProductType;

    @Field(() => ProductStatus)
    productStatus: ProductStatus;

    @Field(() => String)
    productTitle: string;

    @Field(() => Int)
    productPrice: number;

    @Field(() => Int)
    productQuantity: number;

    @Field(() => [String], { nullable: true })
    productImages?: string[];

    @Field(() => String, { nullable: true })
    productShortDesc?: string;

    @Field(() => String, { nullable: true })
    productDesc?: string;

    @Field(() => Int)
    productViews: number;

    @Field(() => Int)
    productLikes: number;

    @Field(() => Int)
    productSave: number;

    @Field(() => Int)
    productComments: number;

    @Field(() => Int)
    productRank: number;

    @Field(() => String)
    memberId: ObjectId;

    @Field(() => Date, { nullable: true })
    deletedAt?: Date;

    @Field(() => Date)
    createdAt: Date;

    @Field(() => Date)
    updatedAt: Date;

    @Field(() => Member, { nullable: true })
    creatorData?: Member;

    @Field(() => [MeLiked], { nullable: true })
    meLiked?: MeLiked[];

    @Field(() => [MeSaved], { nullable: true })
    meSaved?: MeSaved[];
}

@ObjectType()
export class Products {
    @Field(() => [Product])
    list: Product[];

    @Field(() => [TotalCounter], { nullable: true })
    metaCounter: TotalCounter[];
}

