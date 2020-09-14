import IUser from '../interfaces/IUser';
import {
  IRequest,
  IResponse,
  IAuthenticatedRequest,
} from '../interfaces/common';

export interface IUserServiceAPI {
  register(request: IRegisterUserRequest): Promise<IRegisterUserResponse>
  login(request: ILoginUserRequest): Promise<ILoginUserResponse>
  sendPasswordReset(request: ISendUserPasswordResetRequest): Promise<ISendUserPasswordResetResponse>
  resetPassword(request: IResetUserPasswordRequest): Promise<IResetUserPasswordResponse>
  sendEmailVerification(request: ISendUserEmailVerificationRequest): Promise<ISendUserEmailVerificationResponse>
  verifyEmail(request: IVerifyUserEmailRequest): Promise<IVerifyUserEmailResponse>
  get(request: IGetUserRequest): Promise<IGetUserResponse>
  // update(request: IUpdateUserRequest): Promise<IUpdateUserResponse>
}

/********************************************************************************
*  Authentication
********************************************************************************/

export interface IAuthenticateUserResponse extends IResponse {
  user?: IUser;
  token?: string;
}

export interface IRegisterUserRequest extends IRequest {
  firstName: string;
  lastName: string
  email: string
  phoneNumber: string;
  password: string;
}

export interface IRegisterUserResponse extends IAuthenticateUserResponse { }

export interface ILoginUserRequest extends IRequest {
  email: string;
  password: string;
}

export interface ILoginUserResponse extends IAuthenticateUserResponse { }


/********************************************************************************
*  Reset Password
********************************************************************************/
export interface ISendUserPasswordResetRequest extends IRequest {
  email: string;
}

export interface ISendUserPasswordResetResponse extends IResponse {}

export interface IResetUserPasswordRequest extends IRequest {
  resetPasswordCode: string;
  password: string;
}

export interface IResetUserPasswordResponse extends IAuthenticateUserResponse {}

/********************************************************************************
*  Verify Email
********************************************************************************/
export interface ISendUserEmailVerificationRequest extends IAuthenticatedRequest {
  email: string;
}

export interface ISendUserEmailVerificationResponse extends IResponse {}

export interface IVerifyUserEmailRequest extends IRequest {
  verifyEmailCode: string;
}

export interface IVerifyUserEmailResponse extends IResponse {
  verified?: boolean;
}

/********************************************************************************
*  Get User
********************************************************************************/

export interface IGetUserRequest extends IAuthenticatedRequest {}

export interface IGetUserResponse extends IResponse {
  user?: IUser;
}

/********************************************************************************
*  Update User
********************************************************************************/

export interface IUpdateUserRequest extends IAuthenticatedRequest {
  user: IUser;  
}

export interface IUpdateUserResponse extends IResponse {
  user?: IUser;
}
