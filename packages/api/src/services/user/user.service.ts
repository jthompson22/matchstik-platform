import StatusCodeEnum from "@matchstik/models/.dist/enums/StatusCodeEnum";
import { toError } from "@matchstik/models/.dist/interfaces/common";
import IUser from "@matchstik/models/.dist/interfaces/IUser";
import * as IEmailService from '@matchstik/models/.dist/services/IEmailService';
import * as IOrganizationService from '@matchstik/models/.dist/services/IOrganizationService';
import * as IUserService from '@matchstik/models/.dist/services/IUserService';
import Joi from "joi";
import jwt from "jsonwebtoken";
import shortid from "shortid";
import uuid4 from "uuid/v4";
import { JWT_SECRET, WEB_UI_URL } from '../../env';
import { IAppServiceProxy } from "../appServiceProxy";
import UserStore from "./user.store";

const authenticatedSchema = Joi.object().keys({
  userId: Joi.string().required()
});

export default class UserController implements IUserService.IUserServiceAPI {
  private storage = new UserStore();
  private proxy: IAppServiceProxy;

  constructor(proxy: IAppServiceProxy) {
    this.proxy = proxy;
  }

  private generateJWT = (user: IUser): string => {
    return jwt.sign(
      {
        _id: user._id,
        email: user.email,
        organizationId: user.organizationId
      },
      JWT_SECRET
    );
  };

  public register = async (
    request: IUserService.IRegisterUserRequest
  ): Promise<IUserService.IRegisterUserResponse> => {
    let response: IUserService.IRegisterUserResponse = {
      status: StatusCodeEnum.UNKNOWN_CODE
    };

    const schema = Joi.object().keys({
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      phoneNumber: Joi.string().optional()
    });

    const params = Joi.validate(request, schema);
    const { email, password, firstName, lastName, phoneNumber } = params.value;

    if (params.error) {
      console.error(params.error);
      response.status = StatusCodeEnum.UNPROCESSABLE_ENTITY;
      response.error = toError(params.error.details[0].message);
      return response;
    }

    /**
     * Make sure that there isn't an existing account
     * associated with this email address
     */
    let existingUser: IUser;
    try {
      existingUser = await this.storage.findByEmail(email);
    } catch (e) {
      console.error(e);
      response.status = StatusCodeEnum.INTERNAL_SERVER_ERROR;
      response.error = toError(e.message);
      return response;
    }

    if (existingUser && existingUser.email) {
      const errorMsg = "An account with this email already exists.";
      response.status = StatusCodeEnum.BAD_REQUEST;
      response.error = toError(errorMsg);
      return response;
    }

    /**
     * Save the user to storage
     */
    const now = Date.now();
    const _id = shortid.generate();
    const attributes: IUser = {
      _id,
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      organizationId: null,
      meta: {
        createdAt: now,
        createdBy: _id,
        lastUpdatedAt: now,
        lastUpdatedBy: _id,
      }
    };

    let user: IUser;
    try {
      user = await this.storage.createUser(attributes);
    } catch (e) {
      console.error(e);
      response.status = StatusCodeEnum.INTERNAL_SERVER_ERROR;
      response.error = toError(e.message);
      return response;
    }

    /**
     * Create an org for the user
     * and set the organizationId on the user
     */
    try {
      const request: IOrganizationService.ICreateOrganizationRequest = {
        auth: {
          userId: user._id
        },
        organization: {
          userId: user._id,
          name: `${firstName} ${lastName}'s Team`,
          email: email,
          phoneNumber: phoneNumber,
          address: "",
          description: `${firstName} ${lastName}'s Team`
        }
      };

      const response: IOrganizationService.ICreateOrganizationResponse = await this.proxy.organization.create(
        request
      );
      const { organization } = response;

      user = await this.storage.setOrganizationId(user._id, organization._id);
    } catch (e) {
      console.error(e);
      response.status = StatusCodeEnum.INTERNAL_SERVER_ERROR;
      response.error = toError(e.message);
      return response;
    }

    /**
     * Send email verification email
     */
    try {
      const request: IUserService.ISendUserEmailVerificationRequest = {
        auth: {
          userId: user._id
        },
        email: user.email
      };

      this.sendEmailVerification(request);
    } catch (e) {
      console.error(e);
    }

    /**
     * Set final response values
     */
    response.status = StatusCodeEnum.OK;
    response.token = this.generateJWT(user);
    response.user = user;

    return response;
  };

  public login = async (
    request: IUserService.ILoginUserRequest
  ): Promise<IUserService.ILoginUserResponse> => {
    let response: IUserService.ILoginUserResponse;

    const schema = Joi.object().keys({
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string().required()
    });

    const params = Joi.validate(request, schema);
    const { email, password } = params.value;

    if (params.error) {
      console.error(params.error);
      response = {
        status: StatusCodeEnum.UNPROCESSABLE_ENTITY,
        error: toError(params.error.details[0].message)
      };
      return response;
    }

    /**
     * Make sure that there is an existing account
     * associated with this email address
     */
    let user: IUser;
    try {
      user = await this.storage.findByEmail(email);
    } catch (e) {
      console.error(e);
      response = {
        status: StatusCodeEnum.INTERNAL_SERVER_ERROR,
        error: toError(e)
      };
      return response;
    }

    if (!user || !user.email) {
      const errorMsg = "A user with this email does not exist.";
      console.error(errorMsg);
      response = {
        status: StatusCodeEnum.NOT_FOUND,
        error: toError(errorMsg)
      };
      return response;
    }

    let isValidPassword: boolean;
    try {
      isValidPassword = await this.storage.comparePasswordHash(
        password,
        user.passwordHash
      );
    } catch (e) {
      console.error(e);
      response = {
        status: StatusCodeEnum.FORBIDDEN,
        error: toError(e.message)
      };
      return response;
    }

    if (!isValidPassword) {
      const errorMsg = "Invalid Password.";
      console.error(errorMsg);
      response = {
        status: StatusCodeEnum.FORBIDDEN,
        error: toError(errorMsg)
      };
      return response;
    }

    response = {
      status: StatusCodeEnum.OK,
      token: this.generateJWT(user),
      user
    };

    return response;
  };

  public sendPasswordReset = async (
    request: IUserService.ISendUserPasswordResetRequest
  ): Promise<IUserService.ISendUserPasswordResetResponse> => {
    let response: IUserService.ISendUserPasswordResetResponse = {
      status: StatusCodeEnum.UNKNOWN_CODE
    };

    const schema = Joi.object().keys({
      email: Joi.string().required()
    });

    const params = Joi.validate(request, schema);
    const { email }: { email: string } = params.value;

    if (params.error) {
      console.error(params.error);
      response = {
        status: StatusCodeEnum.UNPROCESSABLE_ENTITY,
        error: toError(params.error.details[0].message)
      };
      return response;
    }

    const resetPasswordCode = uuid4();

    try {
      const user: IUser = await this.storage.setResetPasswordCode(
        email,
        resetPasswordCode
      );

      if (user) {
        const sendEmailRequest: IEmailService.ISendUserPasswordResetEmailRequest = {
          toAddress: user.email,
          resetPasswordUrl: `${WEB_UI_URL}/reset-password?code=${resetPasswordCode}`
        };

        await this.proxy.email.sendUserPasswordResetEmail(
          sendEmailRequest
        );
      }
    } catch (e) {
      console.error(e);
      response.error = toError(e.message);
      response.status = StatusCodeEnum.INTERNAL_SERVER_ERROR;
      return response;
    }

    response.status = StatusCodeEnum.OK;
    return response;
  };

  public resetPassword = async (
    request: IUserService.IResetUserPasswordRequest
  ): Promise<IUserService.IResetUserPasswordResponse> => {
    let response: IUserService.IResetUserPasswordResponse = {
      status: StatusCodeEnum.UNKNOWN_CODE
    };

    const schema = Joi.object().keys({
      resetPasswordCode: Joi.string().required(),
      password: Joi.string().required()
    });

    const params = Joi.validate(request, schema);
    const {
      resetPasswordCode,
      password
    }: IUserService.IResetUserPasswordRequest = params.value;

    if (params.error) {
      console.error(params.error);
      response = {
        status: StatusCodeEnum.UNPROCESSABLE_ENTITY,
        error: toError(params.error.details[0].message)
      };
      return response;
    }

    let user: IUser;
    try {
      user = await this.storage.resetPassword(resetPasswordCode, password);

      if (!user) {
        throw new Error("Invalid Code.");
      }
    } catch (e) {
      console.error(e);
      response.error = toError(e.message);
      response.status = StatusCodeEnum.INTERNAL_SERVER_ERROR;
      return response;
    }

    response.status = StatusCodeEnum.OK;
    response.user = user;
    response.token = this.generateJWT(user);
    return response;
  };

  public sendEmailVerification = async (
    request: IUserService.ISendUserEmailVerificationRequest
  ): Promise<IUserService.ISendUserEmailVerificationResponse> => {
    let response: IUserService.ISendUserEmailVerificationResponse = {
      status: StatusCodeEnum.UNKNOWN_CODE
    };

    const schema = Joi.object().keys({
      auth: authenticatedSchema,
      email: Joi.string().required()
    });

    const params = Joi.validate(request, schema);
    const { email }: IUserService.ISendUserEmailVerificationRequest = params.value;

    if (params.error) {
      console.error(params.error);
      response.status = StatusCodeEnum.UNPROCESSABLE_ENTITY;
      response.error = toError(params.error.details[0].message);
      return response;
    }

    const verifyEmailCode = uuid4();

    try {
      const user: IUser = await this.storage.setVerifyEmailCode(
        email,
        verifyEmailCode
      );

      if (user) {
        const request: IEmailService.ISendUserEmailVerificationEmailRequest = {
          toAddress: user.email,
          verifyEmailUrl: `${WEB_UI_URL}/verify-email?code=${verifyEmailCode}`
        };

        await this.proxy.email.sendUserEmailVerificationEmail(request);
      }
    } catch (e) {
      console.error(e);
      response.error = toError(e.message);
      response.status = StatusCodeEnum.INTERNAL_SERVER_ERROR;
      return response;
    }

    response.status = StatusCodeEnum.OK;
    return response;
  };

    public verifyEmail = async (
    request: IUserService.IVerifyUserEmailRequest
  ): Promise<IUserService.IVerifyUserEmailResponse> => {
    let response: IUserService.IVerifyUserEmailResponse = {
      status: StatusCodeEnum.UNKNOWN_CODE
    };

    const schema = Joi.object().keys({
      verifyEmailCode: Joi.string().required(),
    });

    const params = Joi.validate(request, schema);
    const {
      verifyEmailCode,
    }: IUserService.IVerifyUserEmailRequest = params.value;

    if (params.error) {
      console.error(params.error);
      response.status = StatusCodeEnum.UNPROCESSABLE_ENTITY;
      response.error = toError(params.error.details[0].message);
      response.verified = false;
      return response;
    }

    let user: IUser;
    try {
      user = await this.storage.verifyEmail(verifyEmailCode);

      if (!user) {
        const error = new Error("Invalid Code.");
        response.status = StatusCodeEnum.BAD_REQUEST;
        response.error = toError(error.message);
        response.verified = false;
        return response;
      }
    } catch (e) {
      console.error(e);
      response.error = toError(e.message);
      response.status = StatusCodeEnum.INTERNAL_SERVER_ERROR;
      response.verified = false;
      return response;
    }

    response.status = StatusCodeEnum.OK;
    response.verified = true;
    return response;
  };

  public get = async (request: IUserService.IGetUserRequest): Promise<IUserService.IGetUserResponse> => {
    let response: IUserService.IGetUserResponse;

    const schema = Joi.object().keys({
      auth: authenticatedSchema,
    });

    const params = Joi.validate(request, schema);
    const { auth: { userId } }: { auth: { userId: string} } = params.value;

    if (params.error) {
      console.error(params.error);
      response = {
        status: StatusCodeEnum.UNPROCESSABLE_ENTITY,
        error: toError(params.error.details[0].message)
      };
      return response;
    }

    try {
      const user = await this.storage.get(userId);
      response = {
        status: StatusCodeEnum.OK,
        user
      };
      return response;
    } catch (e) {
      console.error(e);
      response = {
        status: StatusCodeEnum.INTERNAL_SERVER_ERROR,
        error: toError(e.message)
      };
      return response;
    }
  };
}
