import { Roles } from '@models/IFUser';
import { IFResponse } from '@models/IFResponse';

export type NameFieldLogin = 'email' | 'password';

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
