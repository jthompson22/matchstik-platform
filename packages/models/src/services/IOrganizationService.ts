import IOrganization from '../interfaces/IOrganization';
import {
  IRequest,
  IResponse,
  IAuthenticatedRequest,
  IAuthorizedRequest,
  IDeleteResponse,
} from '../interfaces/common';

export interface IOrganizationServiceAPI {
  create(request: ICreateOrganizationRequest): Promise<ICreateOrganizationResponse>;
  update(request: IUpdateOrganizationRequest): Promise<IUpdateOrganizationResponse>;
  list(request: IListOrganizationsRequest): Promise<IListOrganizationsResponse>;
  get(request: IGetOrganizationRequest): Promise<IGetOrganizationResponse>;
  delete(request: IDeleteOrganizationRequest): Promise<IDeleteOrganizationResponse>;
}

/********************************************************************************
*  Create Organization
********************************************************************************/

export interface ICreateOrganizationRequest extends IAuthenticatedRequest {
  organization: IOrganization;
}

export interface ICreateOrganizationResponse extends IResponse {
  organization?: IOrganization;
}

/********************************************************************************
*  Update Organzation
********************************************************************************/

export interface IUpdateOrganizationRequest extends IAuthorizedRequest {
  organization: IOrganization;
}

export interface IUpdateOrganizationResponse extends IResponse {
  organization?: IOrganization;
}

/********************************************************************************
*  List Organzations
********************************************************************************/

export interface IListOrganizationsRequest extends IRequest {
  userId: string;
}

export interface IListOrganizationsResponse extends IResponse {
  organizations?: IOrganization[];
}

/********************************************************************************
*  Get Organzation
********************************************************************************/

export interface IGetOrganizationRequest extends IAuthorizedRequest {
  organizationId: string;
}

export interface IGetOrganizationResponse extends IResponse {
  organization?: IOrganization;
}

/********************************************************************************
*  Delete Organzation
********************************************************************************/

export interface IDeleteOrganizationRequest extends IAuthorizedRequest {
  organizationId: string;
}

export interface IDeleteOrganizationResponse extends IDeleteResponse {}
