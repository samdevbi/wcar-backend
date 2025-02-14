import { ObjectId } from 'bson';

export const availableADSSorts = ['createdAt', 'updatedAt', 'memberLikes', 'memberViews', 'memberRank'];
export const availableMemberSorts = ['createdAt', 'updatedAt', 'memberLikes', 'memberViews'];
export const availableProductSorts = ['createdAt', 'updatedAt', 'productViews', 'productLikes'];
export const availableNotifSorts = ['createdAt', 'updatedAt'];

export const availableOptions = ['carBarter', 'carRent'];
export const availableCarSorts = [
    'createdAt',
    'updatedAt',
    'carLikes',
    'carViews',
    'carRank',
    'carPrice',
];

export const availableArticleSorts = ['createdAt', 'updatedAt', 'articleLikes', 'articleViews'];
export const availableCommentSorts = ['createdAt', 'updatedAt'];

/** IMAGE CONFIGURATION **/
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import { T } from './types/common';

export const validMimeTypes = ['image/png', 'image/jpg', 'image/jpeg'];
export const getSerialForImage = (filename: string) => {
    const ext = path.parse(filename).ext;
    return uuidv4() + ext;
};

export const shapeIntoMongoObjectId = (target: any) => {
    return typeof target === 'string' ? new ObjectId(target) : target;
};
export const lookupAuthMemberLiked = (memberId: T, targetRefId: string = '$_id') => {
    return {
        $lookup: {
            from: 'likes',
            let: {
                localLikeRefId: targetRefId,
                localMemberId: memberId,
                localMyFavourite: true
            },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                { $eq: ['$likeRefId', '$$localLikeRefId'] }, { $eq: ['$memberId', '$$localMemberId'] }
                            ],
                        },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        memberId: 1,
                        likeRefId: 1,
                        myFavorite: '$$localMyFavourite',
                    },
                },
            ],
            as: 'meLiked',
        },
    };
};

export const lookupAuthMemberSaved = (memberId: T, targetRefId: string = '$_id') => {
    return {
        $lookup: {
            from: 'saves',
            let: {
                localSaveRefId: targetRefId,
                localMemberId: memberId,
                localMySaved: true
            },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                { $eq: ['$saveRefId', '$$localSaveRefId'] }, { $eq: ['$memberId', '$$localMemberId'] }
                            ],
                        },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        memberId: 1,
                        saveRefId: 1,
                        mySaved: '$$localMySaved',
                    },
                },
            ],
            as: 'meSaved',
        },
    };
};

interface LookupAuthMemberFollowed {
    followerId: T,
    followingId: string,
};


export const lookupAuthMemberFollowed = (input: LookupAuthMemberFollowed) => {
    const { followerId, followingId } = input;
    return {
        $lookup: {
            from: 'follows',
            let: {
                localFollowerId: followerId,
                localFollowingId: followingId,
                localMyFavourite: true
            },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                { $eq: ['$followerId', '$$localFollowerId'] }, { $eq: ['$followingId', '$$localFollowingId'] }
                            ],
                        },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        followerId: 1,
                        followingId: 1,
                        myFollowing: '$$localMyFavourite',
                    },
                },
            ],
            as: 'meFollowed',
        },
    };
};

export const lookupAuthor = {
    $lookup: {
        from: 'members',
        localField: 'authorId',
        foreignField: '_id',
        as: 'creatorData',
    }
}

export const lookupCar = {
    $lookup: {
        from: 'cars',
        localField: 'carId',
        foreignField: '_id',
        as: 'carData',
    }
}

export const lookupArticle = {
    $lookup: {
        from: 'articles',
        localField: 'articleId',
        foreignField: '_id',
        as: 'articleData',
    }
}

export const lookupComment = {
    $lookup: {
        from: 'comments',
        localField: 'commentId',
        foreignField: '_id',
        as: 'commentData',
    }
}

export const lookupMember = {
    $lookup: {
        from: 'members',
        localField: 'memberId',
        foreignField: '_id',
        as: 'creatorData'
    }
}


export const lookupFollowingData = {
    $lookup: {
        from: 'members',
        localField: 'followingId',
        foreignField: '_id',
        as: 'followingData',
    },
};

export const lookupFollowerData = {
    $lookup: {
        from: 'members',
        localField: 'followerId',
        foreignField: '_id',
        as: 'followerData',
    },
};

export const lookupliked = {
    $lookup: {
        from: 'members',
        localField: 'likedCar.memberId',
        foreignField: '_id',
        as: 'likedCar.creatorData',
    },
}

export const lookupVisited = {
    $lookup: {
        from: 'members',
        localField: 'visitedCar.memberId',
        foreignField: '_id',
        as: 'visitedCar.creatorData',
    },
}

export const lookupSaved = {
    $lookup: {
        from: 'members',
        localField: 'savedCar.memberId',
        foreignField: '_id',
        as: 'savedCar.creatorData',
    },
}