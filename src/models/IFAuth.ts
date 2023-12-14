import { Roles } from '@models/IFUser';

export type NameFieldLogin = 'email' | 'password';

export interface IFResponse {
  statusCode: number
  message: string
}

export interface IFAuthResponse {
  roles: Roles,
  fullName: string
  accessToken: string
}

export interface ITokenResponse extends IFResponse {
  auth: {
    accessToken: string
  }
}

export interface IFLogin {
  email: string
  password: string
}

export interface IFLoginResponse extends IFResponse {
  auth: IFAuthResponse
}
