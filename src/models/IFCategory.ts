import { IFRequester } from '@models/IFRequester';
import { IFResponse } from '@models/IFResponse';

export type CategoryParams = {
  title: string
  image?: string
}

export interface IFCategoryId {
  id: string
}

export interface IFCategory {
  image: string
  title: string
  createdAt: string
  updatedAt: string
  _id: string
}

export interface IFGetCategories extends IFRequester {}

export interface IFCreateCategory extends IFRequester {
  data: CategoryParams
}

export interface IFEditCategory extends IFCreateCategory {
  params: IFCategoryId,
}

export interface IFDeleteCategory extends IFRequester {
  params: IFCategoryId
}

export interface IFGetCategoryById extends IFDeleteCategory {}

export interface IFResponseCategory extends IFResponse {
  data?: IFCategory
}

export interface IFResponseCategories extends IFResponse {
  data?: IFCategory[]
}
