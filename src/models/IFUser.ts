import { IFRequester } from '@models/IFRequester';
import { IFResponse } from '@models/IFResponse';
import { IFComment } from '@models/IFComment';
import { IFPost } from '@models/IFPosts';

export type Plan = 'free' | 'premium' | 'pro';
export type Gender = 'female' | 'male' | 'other';
export type UserAward = 'bronze' | 'silver' | 'gold';
export type Roles = 'normal' | 'creator' | 'admin';

export interface IUser {
  school?: string
  alias: string

  lastName: string
  firstName: string
  blocked?: string[]
  blockedCounts?: number
  comments?: string[] | IFComment[]
  createdAt: string
  email: string
  emailVerified?: boolean
  followerCounts: number
  followers: string[]
  following: string[]
  followingCounts: number
  fullName: string
  gender: Gender
  id: string
  isAdmin: boolean
  isBlocked: boolean
  isInactive: boolean
  password?: string
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
  birthDay: string | null
  job?: string
}

export interface IFUserId {
  userId: string
}

export interface IFEditFirstName {
  firstName: string
}

export interface IFEditEmail {
  email: string
}

export interface IFEditLastName {
  lastName: string
}

export interface IFEditAddress {
  address: string
}

export interface IFEditJob {
  job: string
}

export interface IFEditDescription {
  description: string
}

export interface IFEditGender {
  gender: Gender
}

export interface IFEditBirthDay {
  birthDay: string
}

export interface IFChangePassword {
  password?: string
  newPassword: string
  newConfirmPassword: string
}

export interface IFProfilePhoto {
  profilePhoto: string
}

export interface IFEditSchool {
  school: string
}

export interface IFEditAlias {
  alias: string
}

export interface IFFollowing extends IFUserId {}

export interface IFProfileParams extends IFRequester {}

export interface IFEditFirstNameRequest extends IFRequester {
  data: IFEditFirstName
}

export interface IFEditLastNameRequest extends IFRequester {
  data: IFEditLastName
}

export interface IFEditAddressRequest extends IFRequester {
  data: IFEditAddress
}

export interface IFEditJobRequest extends IFRequester {
  data: IFEditJob
}

export interface IFEditDescriptionRequest extends IFRequester {
  data: IFEditDescription
}

export interface IFEditGenderRequest extends IFRequester {
  data: IFEditGender
}

export interface IFEditBirthDayRequest extends IFRequester {
  data: IFEditBirthDay
}

export interface IFChangePasswordRequest extends IFRequester {
  data: IFChangePassword
}

export interface IFProfilePhotoRequest extends IFRequester {
  data: IFProfilePhoto
}

export interface IFEditSchoolRequest extends IFRequester {
  data: IFEditSchool
}

export interface IFEditAliasRequest extends IFRequester {
  data: IFEditAlias
}

export interface IFFollowingRequest extends IFRequester {
  params: IFFollowing
}

export interface IFUnFollowerRequest extends IFFollowingRequest {}

export interface IFProfileResponse extends IFResponse {
  data?: IUser
}
