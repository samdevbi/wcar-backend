import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { CarsModule } from './cars/cars.module';
import { AuthModule } from './auth/auth.module';
import { SaveModule } from './save/save.module';
import { ArticleModule } from './article/article.module';
import { CommentModule } from './comment/comment.module';
import { FollowModule } from './follow/follow.module';
import { LikeModule } from './like/like.module';
import { ViewModule } from './view/view.module';
import { MemberModule } from './member/member.module';
import { NotificationModule } from './notification/notification.module';
import { NoticeModule } from './notice/notice.module';

@Module({
  imports: [
    AuthModule,
    CarsModule,
    ProductsModule,
    SaveModule,
    ArticleModule,
    CommentModule,
    FollowModule,
    LikeModule,
    ViewModule,
    MemberModule,
    NotificationModule,
    NoticeModule,
  ]
})
export class ComponentsModule { }
