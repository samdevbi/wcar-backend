import { Module } from '@nestjs/common';
import { CommentResolver } from './comment.resolver';
import { CommentService } from './comment.service';
import { MongooseModule } from '@nestjs/mongoose';
import CommentSchema from '../../schemas/Comment.model';
import { AuthModule } from '../auth/auth.module';
import { MemberModule } from '../member/member.module';
import { CarsModule } from '../cars/cars.module';
import { ArticleModule } from '../article/article.module';
import { LikeModule } from '../like/like.module';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Comment', schema: CommentSchema }]),
    AuthModule,
    MemberModule,
    CarsModule,
    ProductsModule,
    ArticleModule,
    LikeModule,
  ],
  providers: [CommentResolver, CommentService]
})
export class CommentModule { }
