export type NameFieldRegister = 'email' | 'password' | 'firstName' | 'lastName' | 'passwordConfirm';

export interface IFRegister {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}
