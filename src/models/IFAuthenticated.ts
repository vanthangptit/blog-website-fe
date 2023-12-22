import { Roles } from '@models/IFUser';

export type NameFieldLogin = 'email' | 'password';

export interface IFResponse {
  statusCode: number
  message: string
}

export interface IFTokenResponse extends IFResponse {
  accessToken: string
}

export interface IFLogin {
  email: string
  password: string
}

export interface IFAuth {
  roles: Roles,
  fullName: string
}

export interface IFLoginResponse extends IFTokenResponse {
  user: IFAuth
}
