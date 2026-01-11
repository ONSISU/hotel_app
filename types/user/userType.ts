export interface UserInfo {
  userId: string;
  email: string;
  fullName: string;
  phone: string;
  accessToken: string;
  refreshToken: string;
}

export interface BaseResponse<T> {
  data: T;
  statusCode: number;
  message: string;
}