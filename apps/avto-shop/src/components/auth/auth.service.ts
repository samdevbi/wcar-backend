import { Injectable } from '@nestjs/common';
import * as bycript from 'bcryptjs';
import { Member } from '../../libs/dto/member/member';
import { JwtService } from '@nestjs/jwt';
import { T } from '../../libs/types/common';
import { shapeIntoMongoObjectId } from '../../libs/config';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) { }
    public async hashPassword(password: string): Promise<string> {
        const salt = await bycript.genSalt();
        return await bycript.hash(password, salt);
    };

    public async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return await bycript.compare(password, hashedPassword);
    };

    public async createToken(member: Member): Promise<string> {
        const payload: T = {};
        Object.keys(member['_doc'] ? member['_doc'] : member).map((ele) => {
            payload[`${ele}`] = member[`${ele}`];
        });
        delete payload.password;

        return await this.jwtService.signAsync(payload);
    };

    public async verifyToken(token: string): Promise<Member> {
        const member = await this.jwtService.verifyAsync(token);
        member._id = shapeIntoMongoObjectId(member._id);
        return member;
    }
};

