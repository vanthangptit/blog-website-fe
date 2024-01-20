import { IFResponse } from '@models/IFResponse';
import { IFRequester } from '@models/IFRequester';

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

export interface IFParamsIdRequest {
  id: string
}

export interface IFSinglePostRequest {
  shortUrl: string
}

export interface IFCreatePostRequest extends IFDataPostMutable {
  categoryId: string
}

export interface IFEditPostRequest extends IFRequester {
  data: IFDataPostMutable
  params: IFSinglePostRequest
}

export interface IFDeletePostRequest extends IFRequester {
  id: string
}

export interface IFSavesRequest extends IFRequester {
  params: IFParamsIdRequest
}

export interface IFAssociatePostRequest extends IFSavesRequest {
  data: IFAssociateDataRequest
}

export interface IFPost extends IFDataPostMutable {
  createdAt: string
  updatedAt: string
  category: any // @todo: interface category
  user: any // @todo: interface User
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
  tags?: string[]
  tagsCount?: number
  id: string
  _id: string
}

export interface IFResponseCreatePost extends IFResponse {
  data?: IFPost
}

export interface IFResponseSinglePost extends IFResponseCreatePost {}

export interface IFResponseAllPost extends IFResponse {
  data?: IFPost[]
}
