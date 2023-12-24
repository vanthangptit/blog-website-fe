import { IFRequester } from '@models/IFRequester';

export interface IFGetCategory extends IFRequester {}

export interface IFCategories {
  title: string
  image?: string
}

export interface IFResponseCategories {
  image: string
  title: string
  createdAt: string
  updatedAt: string
  _id: string
}
