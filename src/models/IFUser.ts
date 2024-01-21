import { IFRequester } from '@models/IFRequester';
import { IFResponse } from '@models/IFResponse';
import { IFComment } from '@models/IFComment';
import { IFPost } from '@models/IFPosts';

export type Plan = 'free' | 'premium' | 'pro';
export type Gender = 'female' | 'male' | 'other';
export type UserAward = 'bronze' | 'silver' | 'gold';
export type Roles = 'normal' | 'creator' | 'admin';

export interface IUser {
  lastName: string
  firstName: string
  blocked?: string[]
  blockedCounts?: number
  comments?: string[] | IFComment[]
  createdAt: string
  email: string
  emailVerified?: boolean
  followerCounts: number
  followers?: string[]
  following?: string[]
  followingCounts: number
  fullName: string
  gender: Gender
  id: string
  isAdmin: boolean
  isBlocked: boolean
  isInactive: boolean
  isLoginGoogle: boolean
  lastActive: string
  lastPostDate: string
  plan: Plan
  postCounts: number
  posts?: string[] | IFPost[]
  roles: Roles
  updatedAt: string
  userAward: UserAward
  viewerCounts: number
  viewers: string[]
  _id: string
  profilePhoto?: string
  description?: string
  address?: string
  birthDay: Date | null
  job?: string
}

export interface IFProfileParams extends IFRequester {}

export interface IFEditFirstName {
  firstName: string
}

export interface IFEditLastName {
  lastName: string
}

export interface IFEditFirstNameRequest extends IFRequester {
  data: IFEditFirstName
}

export interface IFEditLastNameRequest extends IFRequester {
  data: IFEditLastName
}

export interface IFProfileResponse extends IFResponse {
  data?: IUser
}
