import { Module } from '@nestjs/common';
import { ProductResolver } from './products.resolver';
import { ProductService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import ProductSchema from '../../schemas/Product.model';
import { AuthModule } from '../auth/auth.module';
import { ViewModule } from '../view/view.module';
import { MemberModule } from '../member/member.module';
import { LikeModule } from '../like/like.module';
import { SaveModule } from '../save/save.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    AuthModule,
    ViewModule,
    MemberModule,
    LikeModule,
    SaveModule,
  ],
  providers: [ProductResolver, ProductService],
  exports: [ProductService],
})
export class ProductsModule { }
