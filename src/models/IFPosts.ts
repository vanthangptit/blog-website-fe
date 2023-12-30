import { IFResponse } from '@models/IFResponse';

export type NameFieldCreatePost = 'title' | 'shortUrl' | 'excerpt' | 'writer';

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

export interface IFSinglePostRequest {
  shortUrl: string
}

export interface IFCreatePostRequest extends IFDataPostMutable {
  categoryId: string
}

export interface IFEditPostRequest extends IFDataPostMutable {
  params: IFSinglePostRequest
}

export interface IFPost extends IFDataPostMutable {
  createdAt: string
  updatedAt: string
  category: string
  user: string
  comments: string[]
  daysAgo: string
  numViews: string[]
  viewsCount: number
  disLikes: string[]
  likes: string[]
  disLikesCount: number
  likesCount: number
  id: string
  _id: string
}

export interface IFResponseCreatePost extends IFResponse {
  data?: IFPost
}

export interface IFResponseSinglePost extends IFResponseCreatePost {}
