import { IFRequester } from '@models/IFRequester';
import { IFResponse } from '@models/IFResponse';

export interface IFGetCategory extends IFRequester {}

export interface IFCategoryId {
  id: string
}

export interface IFCategories {
  title: string
  image?: string
  id?: string
}

export interface IFCategory {
  image: string
  title: string
  createdAt: string
  updatedAt: string
  _id: string
}

export interface IFResponseCategory extends IFResponse {
  data?: IFCategory
}

export interface IFResponseCategories extends IFResponse {
  data?: IFCategory[]
}
