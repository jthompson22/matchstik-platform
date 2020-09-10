import IUser from '@matchstik/models/.dist/interfaces/IUser';
import StatusCodeEnum from '../../models/enums/StatusCodeEnum';
import {
  ApolloError,
  AuthenticationError,
} from 'apollo-server-express';
import controller from '../../controllers/controller';
import {
  IUpdateOrganizationRequest,
  IUpdateOrgResponse,
  IGetOrganizationRequest,
  IGetOrgResponse,
  IDeleteOrganizationRequest,
  IDeleteOrgResponse,
} from '../../models/interfaces/IOrganizationAPI';

export default {
  Query: { 
    async organization(parent, args, context) {
      const { req: { user } }: { req: { user: IUser } } = context;

      const request: IGetOrganizationRequest = {
        auth: {
          userId: user._id,
          organizationId: user.organizationId,
        },
        organizationId: args.organizationId,
      }

      let response: IGetOrgResponse;

      try {
        response = await controller.organization.get(request);

        if (response.status !== StatusCodeEnum.OK) {
          throw new ApolloError(response.error.message, response.status.toString());
        }

      } catch (e) {
        throw e;
      }

      return response.organization;
    },
  },
  Mutation: {
    async updateOrganization(parent, args, context) {
      const { req: { user } }: { req: { user: IUser } } = context;

      if (!user._id) {
        throw new AuthenticationError("Authentication Required.");
      }

      if(!user.organizationId) {
        throw new AuthenticationError("Authorization Required."); 
      }

      const request: IUpdateOrganizationRequest = {
        auth: {
          userId: user._id,
          organizationId: user.organizationId,
        },
        organization: args.organization,
      }

      let response: IUpdateOrgResponse;

      try {
        response = await controller.organization.update(request);

        if (response.status !== StatusCodeEnum.OK) {
          throw new ApolloError(response.error.message, response.status.toString());
        }

      } catch (e) {
        throw e;
      }

      return response.organization;
    },
    async deleteOrganization(parent, args, context) {
      const { req: { user } }: { req: { user: IUser } } = context;

      if (!user._id) {
        throw new AuthenticationError("Authentication Required.");
      }

      if (!user.organizationId) {
        throw new AuthenticationError("Authorization Required.");
      }

      const request: IDeleteOrganizationRequest = {
        auth: {
          userId: user._id,
          organizationId: user.organizationId,
        },
        organizationId: args.organizationId,
      }

      let response: IDeleteOrgResponse;

      try {
        response = await controller.organization.delete(request);

        if (response.status !== StatusCodeEnum.OK) {
          throw new ApolloError(response.error.message, response.status.toString());
        }

      } catch (e) {
        throw e;
      }

      return response.deleted;
    },
  }
};
