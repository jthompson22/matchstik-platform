import StatusCodeEnum from '@matchstik/models/.dist/enums/StatusCodeEnum';
import IUser from '@matchstik/models/.dist/interfaces/IUser';
import * as IOrganizationService from '@matchstik/models/.dist/services/IOrganizationService';
import {
  ApolloError,
  AuthenticationError
} from 'apollo-server-express';
import proxy from '../../services/appServiceProxy';

export default {
  Query: { 
    async organization(parent, args, context) {
      const { req: { user } }: { req: { user: IUser } } = context;

      const request: IOrganizationService.IGetOrganizationRequest = {
        auth: {
          userId: user._id,
          organizationId: user.organizationId,
        },
        organizationId: args.organizationId,
      }

      let response: IOrganizationService.IGetOrganizationResponse;

      try {
        response = await proxy.organization.get(request);

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

      const request: IOrganizationService.IUpdateOrganizationRequest = {
        auth: {
          userId: user._id,
          organizationId: user.organizationId,
        },
        organization: args.organization,
      }

      let response: IOrganizationService.IUpdateOrganizationResponse;

      try {
        response = await proxy.organization.update(request);

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

      const request: IOrganizationService.IDeleteOrganizationRequest = {
        auth: {
          userId: user._id,
          organizationId: user.organizationId,
        },
        organizationId: args.organizationId,
      }

      let response: IOrganizationService.IDeleteOrganizationResponse;

      try {
        response = await proxy.organization.delete(request);

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
