import IUser from '@matchstik/models/.dist/interfaces/IUser';
import StatusCodeEnum from '../../models/enums/StatusCodeEnum';
import {
  ApolloError,
} from 'apollo-server-express';
import controller from '../../controllers/controller';
import {
  IGetUserRequest,
  IGetUserResponse,
  IRegisterUserRequest,
  IRegisterUserResponse,
  ILoginUserRequest,
  ILoginUserResponse,
  ISendUserPasswordResetRequest,
  ISendUserPasswordResetResponse,
  IResetUserPasswordRequest,
  IResetUserPasswordResponse,
  IVerifyUserEmailRequest,
  IVerifyUserEmailResponse,
} from "../../models/interfaces/IUserAPI";

export default {
  Query: {
    async user(parent, args, context) {
      const { req: { user } }: { req: { user: IUser } } = context;

      const request: IGetUserRequest = {
        auth: {
          userId: user._id,
        }
      };

      let response: IGetUserResponse;

      try {
        response = await controller.user.get(request);

        if (response.status !== StatusCodeEnum.OK) {
          throw new ApolloError(
            response.error.message,
            response.status.toString()
          );
        }
      } catch (e) {
        throw e;
      }

      console.log(response.user);

      return response.user;
    }
  },
  Mutation: {
    async register(parent, args, context) {
      const {
        user: { firstName, lastName, email, phoneNumber, password }
      } = args;

      const request: IRegisterUserRequest = {
        firstName,
        lastName,
        email,
        phoneNumber,
        password
      };

      let response: IRegisterUserResponse;

      try {
        response = await controller.user.register(request);

        if (response.status !== StatusCodeEnum.OK) {
          throw new ApolloError(
            response.error.message,
            response.status.toString()
          );
        }
      } catch (e) {
        throw e;
      }

      return response;
    },
    async login(parent, args, context) {
      const { email, password } = args;

      const request: ILoginUserRequest = {
        email,
        password
      };

      let response: ILoginUserResponse;

      try {
        response = await controller.user.login(request);

        if (response.status !== StatusCodeEnum.OK) {
          throw new ApolloError(
            response.error.message,
            response.status.toString()
          );
        }
      } catch (e) {
        throw e;
      }

      return response;
    },
    async sendPasswordReset(parent, args, context) {
      const { email } = args;
      const request: ISendUserPasswordResetRequest = {
        email
      };

      let response: ISendUserPasswordResetResponse;

      try {
        response = await controller.user.sendPasswordReset(request);

        if (response.status !== StatusCodeEnum.OK) {
          throw new ApolloError(
            response.error.message,
            response.status.toString()
          );
        }
      } catch (e) {
        throw e;
      }

      return true;
    },
    async resetPassword(parent, args, context) {
      const { resetPasswordCode, password } = args;

      const request: IResetUserPasswordRequest = {
        resetPasswordCode,
        password
      };

      let response: IResetUserPasswordResponse;

      try {
        response = await controller.user.resetPassword(request);

        if (response.status !== StatusCodeEnum.OK) {
          throw new ApolloError(
            response.error.message,
            response.status.toString()
          );
        }
      } catch (e) {
        throw e;
      }

      return response;
    },
    async verifyEmail(parent, args, context) {
      const { verifyEmailCode } = args;

      const request: IVerifyUserEmailRequest = {
        verifyEmailCode,
      };

      let response: IVerifyUserEmailResponse;

      try {
        response = await controller.user.verifyEmail(request);

        if (response.status !== StatusCodeEnum.OK) {
          throw new ApolloError(
            response.error.message,
            response.status.toString()
          );
        }
      } catch (e) {
        throw e;
      }

      return response.verified;
    }
  }
};
