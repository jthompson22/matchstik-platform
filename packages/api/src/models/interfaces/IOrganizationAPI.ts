import IOrganization from '@matchstik/models/.dist/interfaces/IOrganization';
import {
  IRequest,
  IResponse,
  IAuthenticatedRequest,
  IAuthorizedRequest,
  IDeleteResponse,
} from './common';

export default interface IOrganizationAPI {
  create(request: ICreateOrganizationRequest): Promise<ICreateOrgResponse>;
  update(request: IUpdateOrganizationRequest): Promise<IUpdateOrgResponse>;
  list(request: IListOrgsRequest): Promise<IListOrgsResponse>;
  get(request: IGetOrganizationRequest): Promise<IGetOrgResponse>;
  delete(request: IDeleteOrganizationRequest): Promise<IDeleteOrgResponse>;
}

/********************************************************************************
*  Create Organization
********************************************************************************/

export interface ICreateOrganizationRequest extends IAuthenticatedRequest {
  organization: IOrganization;
}

export interface ICreateOrgResponse extends IResponse {
  organization?: IOrganization;
}

/********************************************************************************
*  Update Organzation
********************************************************************************/

export interface IUpdateOrganizationRequest extends IAuthorizedRequest {
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

export interface IGetOrganizationRequest extends IAuthorizedRequest {
  organizationId: string;
}

export interface IGetOrgResponse extends IResponse {
  organization?: IOrganization;
}

/********************************************************************************
*  Delete Organzation
********************************************************************************/

export interface IDeleteOrganizationRequest extends IAuthorizedRequest {
  organizationId: string;
}

export interface IDeleteOrgResponse extends IDeleteResponse {}
