import { ApolloError } from 'apollo-server-express';
import StatusCodeEnum from '../../models/enums/StatusCodeEnum';
import authorizationDataFromContext from '../utils/authorizationFromContext';
import controller from '../../controllers/controller';
import IProject from '@matchstik/models/.dist/interfaces/IProject';
import * as ProjectAPI from '../../models/interfaces/IProjectAPI'

export default {
  Query: {
    async project(parent, args, context): Promise<IProject> {
      const auth = authorizationDataFromContext(context);

      const request: ProjectAPI.IGetProjectRequest = {
        projectId: args.projectId,
        auth,
      };

      let response: ProjectAPI.IGetProjectResponse;

      try {
        response = await controller.project.get(request);

        if (response.status !== StatusCodeEnum.OK) {
          throw new ApolloError(
            response.error.message,
            response.status.toString()
          );
        }
      } catch (e) {
        throw e;
      }

      return response.project;
    },
    async projects(parent, args, context): Promise<IProject[]> {
      const auth = authorizationDataFromContext(context);

      const request: ProjectAPI.IListProjectsRequest = {
        auth,
        organizationId: auth.organizationId,
      };

      let response: ProjectAPI.IListProjectsResponse;

      try {
        response = await controller.project.list(request);

        if (response.status !== StatusCodeEnum.OK) {
          throw new ApolloError(
            response.error.message,
            response.status.toString()
          );
        }
      } catch (e) {
        throw e;
      }

      return response.projects;
    }
  },
  Mutation: {
    async createProject(parent, args, context): Promise<IProject> {
      const auth = authorizationDataFromContext(context);

      const request: ProjectAPI.ICreateProjectRequest = {
        project: {
          ...args.project,
          organizationId: auth.organizationId,
        },
        auth,
      };

      let response: ProjectAPI.ICreateProjectResponse;

      try {
        response = await controller.project.create(request);

        if (response.status !== StatusCodeEnum.OK) {
          throw new ApolloError(
            response.error.message,
            response.status.toString()
          );
        }
      } catch (e) {
        throw e;
      }

      return response.project;
    },
  }
};
