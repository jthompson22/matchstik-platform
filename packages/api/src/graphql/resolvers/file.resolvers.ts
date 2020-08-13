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
import fs from 'fs';

export default {
  Query: {
    async file(parent, args, context) {
      const file = await fs.readFileSync('/Users/samheutmaker/desktop/juice/src/matchstik/files/results1.json').toString();
      // console.log(file);
      return JSON.parse(file);
    }
  },
 Mutation: {},
};
