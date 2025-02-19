import { Module } from '@nestjs/common';
import { InjectConnection, MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: () => ({
                uri: process.env.ENV === 'production' ? process.env.MONGO_PRODUCTION : process.env.MONGO_DEVELOPMENT,
            }),
        }),
    ],
    exports: [MongooseModule],
})
export class DatabaseModule {
    constructor(@InjectConnection() private readonly connection: Connection) {
        if (connection.readyState === 1) {
            console.log(
                `MongoDB is successfully connected into ${process.env.ENV === 'production' ? 'production' : 'development'} db`
            );
        } else {
            console.log('MongoDB is not connected!');
        }
    }
}
