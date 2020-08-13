import IProject from '@matchstik/models/.dist/interfaces/IProject';
import {
  IRequest,
  IResponse,
  IAuthenticatedRequest,
  IAuthorizedRequest,
  IDeleteResponse,
} from './common';

export default interface IProjectAPI {
  create(request: ICreateProjectRequest): Promise<ICreateProjectResponse>;
  update(request: IUpdateProjectRequest): Promise<IUpdateProjectResponse>;
  list(request: IListProjectsRequest): Promise<IListProjectsResponse>;
  get(request: IGetProjectRequest): Promise<IGetProjectResponse>;
  delete(request: IDeleteProjectRequest): Promise<IDeleteProjectResponse>;
}

/********************************************************************************
*  Create Project
********************************************************************************/

export interface ICreateProjectRequest extends IAuthorizedRequest {
  project: IProject;
}

export interface ICreateProjectResponse extends IResponse {
  project?: IProject;
}

/********************************************************************************
*  Update Projectanzation
********************************************************************************/

export interface IUpdateProjectRequest extends IAuthorizedRequest {
  project: IProject;
}

export interface IUpdateProjectResponse extends IResponse {
  project?: IProject;
}

/********************************************************************************
*  List Projectanzations
********************************************************************************/

export interface IListProjectsRequest extends IAuthorizedRequest {
  organizationId: string;
}

export interface IListProjectsResponse extends IResponse {
  projects?: IProject[];
}

/********************************************************************************
*  Get Projectanzation
********************************************************************************/

export interface IGetProjectRequest extends IAuthorizedRequest {
  projectId: string;
}

export interface IGetProjectResponse extends IResponse {
  project?: IProject;
}

/********************************************************************************
*  Delete Projectanzation
********************************************************************************/

export interface IDeleteProjectRequest extends IAuthorizedRequest {
  projectId: string;
}

export interface IDeleteProjectResponse extends IDeleteResponse {}
