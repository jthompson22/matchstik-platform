import {
  IRequest,
  IResponse,
  // IAuthenticatedRequest,
} from '../interfaces/common';

export interface IEmailServiceAPI {
  sendUserPasswordResetEmail(request: ISendUserPasswordResetEmailRequest): Promise<ISendUserPasswordResetEmailResponse>
  sendUserEmailVerificationEmail(request: ISendUserEmailVerificationEmailRequest): Promise<ISendUserEmailVerificationEmailResponse>
}

/********************************************************************************
*  Emails
********************************************************************************/

export interface ISendEmailRequest extends IRequest {
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
