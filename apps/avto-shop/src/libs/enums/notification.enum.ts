import { registerEnumType } from '@nestjs/graphql';

export enum NotificationType {
	LIKE = 'LIKE',
	COMMENT = 'COMMENT',
	SAVE = 'SAVE',
	RANK = 'RANK',
	FOLLOW = 'FOLLOW'
}
registerEnumType(NotificationType, {
	name: 'NotificationType',
});

export enum NotificationStatus {
	WAIT = 'WAIT',
	READ = 'READ',
	DELETE = 'DELETE',
}
registerEnumType(NotificationStatus, {
	name: 'NotificationStatus',
});

export enum NotificationGroup {
	MEMBER = 'MEMBER',
	CAR = 'CAR',
	ARTICLE = 'ARTICLE',
}
registerEnumType(NotificationGroup, {
	name: 'NotificationGroup',
});
