import StatusCodeEnum from '@matchstik/models/.dist/enums/StatusCodeEnum';
import IUser from '@matchstik/models/.dist/interfaces/IUser';
import * as IUserService from '@matchstik/models/.dist/services/IUserService';
import {
  ApolloError
} from 'apollo-server-express';
import proxy from '../../services/appServiceProxy';

export default {
  Query: {
    async user(parent, args, context) {
      const { req: { user } }: { req: { user: IUser } } = context;

      const request: IUserService.IGetUserRequest = {
        auth: {
          userId: user._id,
        }
      };

      let response: IUserService.IGetUserResponse;

      try {
        response = await proxy.user.get(request);

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

      const request: IUserService.IRegisterUserRequest = {
        firstName,
        lastName,
        email,
        phoneNumber,
        password
      };

      let response: IUserService.IRegisterUserResponse;

      try {
        response = await proxy.user.register(request);

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

      const request: IUserService.ILoginUserRequest = {
        email,
        password
      };

      let response: IUserService.ILoginUserResponse;

      try {
        response = await proxy.user.login(request);

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
      const request: IUserService.ISendUserPasswordResetRequest = {
        email
      };

      let response: IUserService.ISendUserPasswordResetResponse;

      try {
        response = await proxy.user.sendPasswordReset(request);

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

      const request: IUserService.IResetUserPasswordRequest = {
        resetPasswordCode,
        password
      };

      let response: IUserService.IResetUserPasswordResponse;

      try {
        response = await proxy.user.resetPassword(request);

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

      const request: IUserService.IVerifyUserEmailRequest = {
        verifyEmailCode,
      };

      let response: IUserService.IVerifyUserEmailResponse;

      try {
        response = await proxy.user.verifyEmail(request);

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
