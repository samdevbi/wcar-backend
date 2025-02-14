import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, Length } from "class-validator";
import { ObjectId } from "mongoose";
import { ProductStatus, ProductType } from "../../enums/product.enum";



@InputType()
export class ProductUpdate {
    @IsNotEmpty()
    @Field(() => String)
    _id: ObjectId;

    @IsOptional()
    @Field(() => ProductType, { nullable: true })
    productType?: ProductType;

    @IsOptional()
    @Field(() => ProductStatus, { nullable: true })
    productStatus?: ProductStatus;

    @IsOptional()
    @Length(5, 100)
    @Field(() => String, { nullable: true })
    productTitle?: string;

    @IsOptional()
    @Field(() => Int, { nullable: true })
    productPrice?: number;

    @IsOptional()
    @Field(() => Int, { nullable: true })
    productQuantity?: number;

    @IsOptional()
    @Field(() => [String], { nullable: true })
    productImages?: string[];

    @IsOptional()
    @Length(20, 500)
    @Field(() => String, { nullable: true })
    productShortDesc?: string;

    @IsOptional()
    @Length(20, 500)
    @Field(() => String, { nullable: true })
    productDesc?: string;

    deletedAt?: Date;
}