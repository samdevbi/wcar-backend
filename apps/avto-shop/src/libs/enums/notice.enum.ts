import { registerEnumType } from '@nestjs/graphql';

export enum NoticeCategory {
	FAQ = 'FAQ',
	EVENT = 'EVENT',
	TERMS = 'TERMS',
	INQUIRY = 'INQUIRY',
}
registerEnumType(NoticeCategory, {
	name: 'NoticeCategory',
});

export enum NoticeGroup {
	CAR = 'CAR',
	FOR_BUYERS = 'FOR_BUYERS',
	PAYMENT = 'PAYMENT',
	FOR_AGENTS = 'FOR_AGENTS',
	FOR_DEALERS = 'FOR_DEALERS',
	MEMBERSHIP = 'MEMBERSHIP',
	COMMUNITY = 'COMMUNITY',
	OTHER = 'OTHER',
	EVENT = "EVENT",
}
registerEnumType(NoticeGroup, {
	name: 'NoticeGroup',
});

export enum NoticeStatus {
	HOLD = 'HOLD',
	ACTIVE = 'ACTIVE',
	DELETE = 'DELETE',
}
registerEnumType(NoticeStatus, {
	name: 'NoticeStatus',
});
