export type Plan = 'free' | 'premium' | 'pro';
export type Gender = 'female' | 'male' | 'other';
export type UserAward = 'bronze' | 'silver' | 'gold';
export type Roles = 'normal' | 'creator' | 'admin';

export interface IUser {
  firstName: string
  lastName: string
  email: string
  password?: string
  isLoginGoogle?: boolean
  isBlocked?: boolean
  isAdmin?: boolean
  emailVerified?: boolean
  profilePhoto?: string
  gender?: Gender
  birthDay?: string
  viewers?: string[]
  followers?: string[]
  following?: string[]
  posts?: string[]
  comments?: string[]
  blocked?: string[]
  plan?: Plan
  userAward?: UserAward
  roles?: Roles
}
