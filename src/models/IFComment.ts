import { IFResponse } from '@models/IFResponse';
import { IFRequester } from '@models/IFRequester';
import { IFPost } from '@models/IFPosts';
import { IUser } from '@models/IFUser';

export interface IFParamsPostIdComment {
  id: string
}

export interface IFDataComment {
  description: string
}

export interface IFParamsCommentRequest extends IFRequester {
  params: IFParamsPostIdComment
}

export interface IFDataCommentRequest extends IFParamsCommentRequest {
  data: IFDataComment
}

export interface IFComment {
  description: string
  user: IUser
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
