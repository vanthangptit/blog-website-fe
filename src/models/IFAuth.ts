export type NameFieldLogin = 'email' | 'password';

export interface IFTokens {
  accessToken: string
}

export interface IFLogin {
  email: string
  password: string
}

export interface ILoginResponse {
  data?: IFTokens
  status: number
  message: string
}
