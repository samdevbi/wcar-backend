import { registerEnumType } from '@nestjs/graphql';

export enum CommentStatus {
	ACTIVE = 'ACTIVE',
	DELETE = 'DELETE',
}
registerEnumType(CommentStatus, {
	name: 'CommentStatus',
});

export enum CommentGroup {
	COMMENT = 'COMMENT',
	MEMBER = 'MEMBER',
	CAR = 'CAR',
	ARTICLE = 'ARTICLE',
	PRODUCT = 'PRODUCT',
}
registerEnumType(CommentGroup, {
	name: 'CommentGroup',
});
