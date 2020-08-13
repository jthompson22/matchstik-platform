import IOrganization from '@matchstik/models/.dist/interfaces/IOrganization';
import {
  IRequest,
  IResponse,
  IAuthenticatedRequest,
  IAuthorizedRequest,
  IDeleteResponse,
} from './common';

export default interface IOrganizationAPI {
  create(request: ICreateOrgRequest): Promise<ICreateOrgResponse>;
  update(request: IUpdateOrgRequest): Promise<IUpdateOrgResponse>;
  list(request: IListOrgsRequest): Promise<IListOrgsResponse>;
  get(request: IGetOrgRequest): Promise<IGetOrgResponse>;
  delete(request: IDeleteOrgRequest): Promise<IDeleteOrgResponse>;
}

/********************************************************************************
*  Create Organization
********************************************************************************/

export interface ICreateOrgRequest extends IAuthenticatedRequest {
  organization: IOrganization;
}

export interface ICreateOrgResponse extends IResponse {
  organization?: IOrganization;
}

/********************************************************************************
*  Update Organzation
********************************************************************************/

export interface IUpdateOrgRequest extends IAuthorizedRequest {
  organization: IOrganization;
}

export interface IUpdateOrgResponse extends IResponse {
  organization?: IOrganization;
}

/********************************************************************************
*  List Organzations
********************************************************************************/

export interface IListOrgsRequest extends IRequest {
  userId: string;
}

export interface IListOrgsResponse extends IResponse {
  organizations?: IOrganization[];
}

/********************************************************************************
*  Get Organzation
********************************************************************************/

export interface IGetOrgRequest extends IAuthorizedRequest {
  organizationId: string;
}

export interface IGetOrgResponse extends IResponse {
  organization?: IOrganization;
}

/********************************************************************************
*  Delete Organzation
********************************************************************************/

export interface IDeleteOrgRequest extends IAuthorizedRequest {
  organizationId: string;
}

export interface IDeleteOrgResponse extends IDeleteResponse {}
