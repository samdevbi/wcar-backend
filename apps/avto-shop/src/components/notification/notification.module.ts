import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import NotificationSchema from "../../schemas/Notification.model";
import { NotificationResolver } from "./notification.resolver";
import { NotificationService } from "./notification.service";
import { AuthModule } from "../auth/auth.module";
import { MemberModule } from "../member/member.module";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'Notification',
                schema: NotificationSchema,
            }
        ]),
        AuthModule,
        MemberModule,
    ],
    providers: [NotificationResolver, NotificationService],
    exports: [NotificationResolver, NotificationService],
})
export class NotificationModule { }
