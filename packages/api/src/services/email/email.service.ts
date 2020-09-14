import StatusCodeEnum from "@matchstik/models/.dist/enums/StatusCodeEnum";
import { toError } from "@matchstik/models/.dist/interfaces/common";
import * as IEmailService from '@matchstik/models/.dist/services/IEmailService';
import * as nodemailer from "nodemailer";
import nodemailerSendgrid from "nodemailer-sendgrid";
import { DEBUG_ENABLED, SENDGRID_API_KEY } from "../../env";

enum EmailTemplatesEnum {
  PasswordReset = "Password Reset",
  VerifyEmail = 'Verify Email',
}

const html: Record<EmailTemplatesEnum, (context: any) => string> = {
  [EmailTemplatesEnum.PasswordReset]: context =>
    `A password reset was request for your account. <a href=${context.resetPasswordUrl}>Click here</a> to reset your password.`,
  [EmailTemplatesEnum.VerifyEmail]: context =>
    `<a href=${context.verifyEmailUrl}>Click here</a> to verify your Matchstik.io email address.`
};

export default class EmailService implements IEmailService.IEmailServiceAPI {
  private mailer;

  constructor() {
    this.mailer = this.createTransport(
      nodemailerSendgrid({
        apiKey: SENDGRID_API_KEY
      })
    );
  }
  private createTransport(config) {
    const transport = nodemailer.createTransport(config);
    transport.verify((error, success) => {
      if (error) {
        console.error(error);
        process.exit(1);
      }
    });
    return transport;
  }

  private sendEmail = async (
    template: EmailTemplatesEnum,
    subject: string,
    toAddress: string,
    context: any
  ): Promise<any> => {
    if (DEBUG_ENABLED) {
      console.info(
        `Sending ${template} email to ${toAddress} with context ${JSON.stringify(
          context
        )}`
      );
    }

    const email = {
      subject,
      html: html[template](context),
      to: toAddress,
      from: "account@matchstik.io",
      headers: { "X-SES-CONFIGURATION-SET": "matchstik-default" }
    };

    try {
      return await this.mailer.sendMail(email);
    } catch (e) {
      throw e;
    }
  };

  /****************************************************************************************
   * User
   ****************************************************************************************/

  // public queueUserWelcomeEmail = async (request: pb.IEmailService.QueueUserWelcomeEmailRequest): Promise<pb.google.protobuf.Empty> => {
  //   await this.sendEmail(
  //     'userWelcomeEmail',
  //     'Welcome to Matchstik',
  //     request.toAddress,
  //     null,
  //     {
  //       firstName: request.firstName,
  //       lastName: request.lastName,
  //       verificationCode: request.verificationCode,
  //     },
  //   );

  //   const response = pb.google.protobuf.Empty.create();
  //   return response;
  // }
  public sendUserPasswordResetEmail = async (
    request: IEmailService.ISendUserPasswordResetEmailRequest
  ): Promise<IEmailService.ISendUserPasswordResetEmailResponse> => {
    let response: IEmailService.ISendUserPasswordResetEmailResponse = {
      status: StatusCodeEnum.UNKNOWN_CODE
    };
    try {
      await this.sendEmail(
        EmailTemplatesEnum.PasswordReset,
        "Matchstik - Reset Your Password",
        request.toAddress,
        {
          resetPasswordUrl: request.resetPasswordUrl
        }
      );
    } catch (e) {
      response.status = StatusCodeEnum.INTERNAL_SERVER_ERROR;
      response.error = toError(e.message);
      return response;
    }
    response.status = StatusCodeEnum.OK;
    return response;
  };

  public sendUserEmailVerificationEmail = async (
    request: IEmailService.ISendUserEmailVerificationEmailRequest
  ): Promise<IEmailService.ISendUserEmailVerificationEmailResponse> => {
    let response: IEmailService.ISendUserEmailVerificationEmailResponse = {
      status: StatusCodeEnum.UNKNOWN_CODE
    };
    try {
      await this.sendEmail(
        EmailTemplatesEnum.VerifyEmail,
        "Matchstik - Verify your account",
        request.toAddress,
        {
          verifyEmailUrl: request.verifyEmailUrl
        }
      );
    } catch (e) {
      response.status = StatusCodeEnum.INTERNAL_SERVER_ERROR;
      response.error = toError(e.message);
      return response;
    }
    response.status = StatusCodeEnum.OK;
    return response;
  };
  
  // public IEmailService.queueInviteToOrganizationEmailRequest = async (request: pb.IEmailService.QueueInviteToOrganizationEmailRequest): Promise<pb.google.protobuf.Empty> => {
  //   await this.sendEmail(
  //     'inviteToOrganization',
  //     `Join ${request.orgName} on Matchstik`,
  //     request.toAddress,
  //     null,
  //     {
  //       orgName: request.orgName,
  //       redirectUrl: request.redirectUrl,
  //       orgLogo: request.orgLogo,
  //       roleName: request.roleName,
  //     },
  //   );

  //   const response = pb.google.protobuf.Empty.create();
  //   return response;
  // }
}
