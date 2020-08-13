import jwt from "jsonwebtoken";
import Joi from "joi";
import uuid4 from "uuid/v4";
import UserStore from "../stores/user.store";
import IUser from "@matchstik/models/.dist/interfaces/IUser";
import IOrganization from "@matchstik/models/.dist/interfaces/IOrganization";
import {
  ICreateOrgRequest,
  ICreateOrgResponse
} from "../models/interfaces/IOrganizationAPI";
import StatusCodeEnum from "../models/enums/StatusCodeEnum";
import { toError } from "../models/interfaces/common";
import { JWT_SECRET } from "../env";
import { IController } from "./controller";
import IUserAPI, {
  IRegisterUserRequest,
  ILoginUserRequest,
  IRegisterUserResponse,
  ILoginUserResponse,
  IGetUserRequest,
  IGetUserResponse,
  ISendUserPasswordResetRequest,
  ISendUserPasswordResetResponse,
  IResetUserPasswordRequest,
  IResetUserPasswordResponse,
  ISendUserEmailVerificationRequest,
  ISendUserEmailVerificationResponse,
  IVerifyUserEmailRequest,
  IVerifyUserEmailResponse
} from "src/models/interfaces/IUserAPI";
import {
  ISendUserPasswordResetEmailRequest,
  ISendUserEmailVerificationEmailRequest
} from "src/models/interfaces/IEmailService";

const authenticatedSchema = Joi.object().keys({
  userId: Joi.string().required()
});

export default class UserController implements IUserAPI {
  private storage = new UserStore();
  private controller;

  constructor(controller: IController) {
    this.controller = controller;
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
    request: IRegisterUserRequest
  ): Promise<IRegisterUserResponse> => {
    let response: IRegisterUserResponse = {
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
    const attributes: IUser = {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      organizationId: null,
      meta: {
        createdAt: Date.now(),
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
      const request: ICreateOrgRequest = {
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

      const response: ICreateOrgResponse = await this.controller.organization.create(
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
      const request: ISendUserEmailVerificationRequest = {
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
    request: ILoginUserRequest
  ): Promise<ILoginUserResponse> => {
    let response: ILoginUserResponse;

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
    request: ISendUserPasswordResetRequest
  ): Promise<ISendUserPasswordResetResponse> => {
    let response: ISendUserPasswordResetResponse = {
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
        const sendEmailRequest: ISendUserPasswordResetEmailRequest = {
          toAddress: user.email,
          resetPasswordUrl: `http://localhost:3000/reset-password?code=${resetPasswordCode}`
        };

        await this.controller.email.sendUserPasswordResetEmail(
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
    request: IResetUserPasswordRequest
  ): Promise<IResetUserPasswordResponse> => {
    let response: IResetUserPasswordResponse = {
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
    }: IResetUserPasswordRequest = params.value;

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
    request: ISendUserEmailVerificationRequest
  ): Promise<ISendUserEmailVerificationResponse> => {
    let response: ISendUserEmailVerificationResponse = {
      status: StatusCodeEnum.UNKNOWN_CODE
    };

    const schema = Joi.object().keys({
      auth: authenticatedSchema,
      email: Joi.string().required()
    });

    const params = Joi.validate(request, schema);
    const { email }: ISendUserEmailVerificationRequest = params.value;

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
        const request: ISendUserEmailVerificationEmailRequest = {
          toAddress: user.email,
          verifyEmailUrl: `http://localhost:3000/verify-email?code=${verifyEmailCode}`
        };

        await this.controller.email.sendUserEmailVerificationEmail(request);
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
    request: IVerifyUserEmailRequest
  ): Promise<IVerifyUserEmailResponse> => {
    let response: IVerifyUserEmailResponse = {
      status: StatusCodeEnum.UNKNOWN_CODE
    };

    const schema = Joi.object().keys({
      verifyEmailCode: Joi.string().required(),
    });

    const params = Joi.validate(request, schema);
    const {
      verifyEmailCode,
    }: IVerifyUserEmailRequest = params.value;

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

  public get = async (request: IGetUserRequest): Promise<IGetUserResponse> => {
    let response: IGetUserResponse;

    const schema = Joi.object().keys({
      userId: Joi.string().required()
    });

    const params = Joi.validate(request, schema);
    const { userId }: { userId: string } = params.value;

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
