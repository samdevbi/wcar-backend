import { Field, ObjectType } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import { MeLiked } from '../like/like';
import { Member, TotalCounter } from '../member/member';

@ObjectType()
export class MeFollowed {
	@Field(() => String)
	followingId: ObjectId;

	@Field(() => String)
	followerId: ObjectId;

	@Field(() => Boolean)
	myFollowing: boolean;
}

@ObjectType()
export class Follower {
	@Field(() => String)
	_id: ObjectId;

	@Field(() => String)
	followingId: ObjectId;

	@Field(() => String)
	followerId: ObjectId;

	@Field(() => Date)
	createdAt: Date;

	@Field(() => Date)
	updatedAt: Date;

	@Field(() => [MeLiked], { nullable: true })
	meLiked?: MeLiked[];

	@Field(() => [MeFollowed], { nullable: true })
	meFollowed?: MeFollowed[];

	@Field(() => Member, { nullable: true })
	followerData?: Member;
}

@ObjectType()
export class Followers {
	@Field(() => [Follower])
	list: Follower[];

	@Field(() => [TotalCounter], { nullable: true })
	metaCounter: TotalCounter[];
}

@ObjectType()
export class Following {
	@Field(() => String)
	_id: ObjectId;

	@Field(() => String)
	followingId: ObjectId;

	@Field(() => String)
	followerId: ObjectId;

	@Field(() => Date)
	createdAt: Date;

	@Field(() => Date)
	updatedAt: Date;

	@Field(() => [MeLiked], { nullable: true })
	meLiked?: MeLiked[];

	@Field(() => [MeFollowed], { nullable: true })
	meFollowed?: MeFollowed[];

	@Field(() => Member, { nullable: true })
	followingData?: Member;
}

@ObjectType()
export class Followings {
	@Field(() => [Following])
	list: Following[];

	@Field(() => [TotalCounter], { nullable: true })
	metaCounter: TotalCounter[];
}
