import { registerEnumType } from '@nestjs/graphql';

export enum ViewGroup {
	MEMBER = 'MEMBER',
	CAR = 'CAR',
	ARTICLE = 'ARTICLE',
}
registerEnumType(ViewGroup, {
	name: 'ViewGroup',
});
