import { ViewService } from './view.service';
import { MongooseModule } from '@nestjs/mongoose';
import ViewSchema from '../../schemas/View.model';
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: "View", schema: ViewSchema }]),
    AuthModule],
  providers: [ViewService],
  exports: [ViewService]
})
export class ViewModule { }
