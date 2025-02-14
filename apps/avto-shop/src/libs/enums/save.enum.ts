import { registerEnumType } from '@nestjs/graphql';

export enum SaveGroup {
    CAR = 'CAR',
    MEMBER = 'MEMBER'
}
registerEnumType(SaveGroup, {
    name: 'SaveGroup',
});