import { IFResponse } from '@models/IFResponse';
import { IFRequester } from '@models/IFRequester';
import { IUser } from '@models/IFUser';
import { IFTag } from '@models/IFTags';

export interface IFDataPostMutable {
  title: string
  writer: string
  excerpt: string
  shortUrl: string
  imageUrl: string
  description: string
  isPublished: boolean
}

export interface IFPostForm {
  title: string
  writer: string
  excerpt: string
  shortUrl: string
  visibility: string
}

export type Associate = 'likes'|'disLikes'|'hearts'|'stars';

export interface IFAssociateDataRequest {
  associate: Associate
}

export interface IFParamsId {
  id: string
}

export interface IFParamsShortUrl {
  shortUrl: string
}

export interface IFCreatePostRequest extends IFDataPostMutable {
  tags: string[]
}

export interface IFEditPostRequest extends IFRequester {
  data: IFCreatePostRequest
  params: IFParamsId
}

export interface IFDeletePostRequest extends IFRequester {
  params: IFParamsId
}

export interface IFSavesRequest extends IFRequester {
  params: IFParamsId
}

export interface IFPinRequest extends IFSavesRequest {}

export interface IFAssociatePostRequest extends IFSavesRequest {
  data: IFAssociateDataRequest
}

export interface IFSinglePostRequest extends IFRequester {
  params: IFParamsShortUrl
}

export interface IFPost extends IFDataPostMutable {
  isPinned: boolean
  createdAt: string
  updatedAt: string
  creator: IUser
  comments: string[]
  commentsCount: number
  daysAgo: string
  numViews: string[]
  viewsCount: number
  disLikes: string[]
  disLikesCount: number
  likes: string[]
  likesCount: number
  saves: string[]
  savesCount: number
  stars: string[]
  starsCount: number
  hearts: string[]
  heartsCount: number
  tags: IFTag[]
  tagsCount?: number
  id: string
  _id: string
}

export interface IFResponseCreatePost extends IFResponse {
  data?: IFPost
}

export interface IFResponseSinglePost extends IFResponse {
  data?: {
    postRelated: IFPost[]
    singlePost: IFPost
  }
}

export interface IFResponseAllPost extends IFResponse {
  data?: IFPost[]
}

export interface IFResponseAllTags extends IFResponse {
  data?: IFTag[]
}
