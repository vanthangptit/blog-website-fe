import { IFResponse } from '@models/IFResponse';
import { IFRequester } from '@models/IFRequester';
import { IFPost } from '@models/IFPosts';

export interface IFDataCommentRequest extends IFRequester {
  description: string
}

export interface IFParamsCommentRequest extends IFRequester {
  id: string
}

export interface IFComment {
  description: string
  user: any // @todo: interface User
  post: string | IFPost
  likes: string[]
  id: string
  _id: string
  createdAt: string
  updatedAt: string
}

export interface IFResponseComment extends IFResponse {
  data?: IFComment[]
}
