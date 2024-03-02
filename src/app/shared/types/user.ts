export interface UserLoginModel {
  email: string;
  password: string;
}

export interface UserRegisterModel {
  fullName: string;
  birthDate: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface TokenResponse {
  token: string;
}
