export type NameFieldCreatePost = 'title' | 'shortUrl' | 'excerpt' | 'writer';

export interface IPostForm {
  title: string
  shortUrl: string
  excerpt: string
  writer: string
}

export interface IPostParamsGetAll {
  page: number
  pageSize: number
  type?: string
}

export interface IPostParams {
  title: string
  shortUrl: string
  excerpt: string
  writer: string
  postType: string
  public: boolean
  imageUrl?: string
  description?: string
  postId?: string
}

export interface IPostAuthor {
  exp: any
  iat: any
  firstName: string
  lastName: string
  userId: string
  username: string
}

export interface IPost {
  author: IPostAuthor
  description?: string
  excerpt: string
  writer: string
  visible: boolean
  imageUrl: string
  postType: string
  shortUrl: string
  title: string
  createdAt: string
  updatedAt: string
  __v: any
  _id: string
}

export interface IPostCreateResponse {
  message: string
  status: number
  errorCode?: string
  post: IPost
}

export interface IDataAllPost {
  count: number
  items: IPost[]
  postLatestOfType?: IPost[]
  page: number
  pageCount: number
  pageSize: number
}
