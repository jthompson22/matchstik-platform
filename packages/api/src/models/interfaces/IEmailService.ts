import IUser from '@matchstik/models/.dist/interfaces/IUser';
import {
  IRequest,
  IResponse,
  IAuthenticatedRequest,
} from './common';

export default interface IEmailService {
  sendUserPasswordResetEmail(request: ISendUserPasswordResetEmailRequest): Promise<ISendUserPasswordResetEmailResponse>
  sendUserEmailVerificationEmail(request: ISendUserEmailVerificationEmailRequest): Promise<ISendUserEmailVerificationEmailResponse>
}

/********************************************************************************
*  Emails
********************************************************************************/

export interface ISendEmailRequest {
  toAddress: string;
}

/********************************************************************************
*  Send Password Reset
********************************************************************************/

export interface ISendUserPasswordResetEmailRequest extends ISendEmailRequest {
  resetPasswordUrl: string;
}

export interface ISendUserPasswordResetEmailResponse extends IResponse { }

/********************************************************************************
*  Send Email Verification
********************************************************************************/

export interface ISendUserEmailVerificationEmailRequest extends ISendEmailRequest {
  verifyEmailUrl: string;
}

export interface ISendUserEmailVerificationEmailResponse extends IResponse {}
