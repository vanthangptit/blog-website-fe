import { IFPost } from '@models/IFPosts';

export interface IFSearchTag {
  id: string
  text: string
}

export interface IFTag {
  id: string
  title: string
  post: IFPost
  createdAt: number
  updatedAt: number
}