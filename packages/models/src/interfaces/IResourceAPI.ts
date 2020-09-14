import IError from './IError';
import StatusCodeEnum from '../enums/StatusCodeEnum';

export interface IRequest {}

export interface IResponse {
  status: StatusCodeEnum;
  error?: IError;
}

export interface IAuthenticationData {
  userId: string;
}

export interface IAuthorizationData extends IAuthenticationData {
  organizationId: string | null;
}

export interface IAuthenticatedRequest extends IRequest {
  auth: IAuthenticationData;
}

export interface IAuthorizedRequest extends IRequest {
  auth: IAuthorizationData;
}

export interface IDeleteResponse extends IResponse {
  deleted: boolean
}

export default interface IResourceAPI {
  create(request: IRequest): Promise<IResponse>;
  update(request: IRequest): Promise<IResponse>;
  list?(request: IRequest): Promise<IResponse>;
  get?(request: IRequest): Promise<IResponse>;
}

export interface IPrivateResourceAPI extends IResourceAPI {
  create(request: IAuthenticatedRequest): Promise<IResponse>;
  update(request: IAuthenticatedRequest): Promise<IResponse>;
  list(request: IAuthenticatedRequest): Promise<IResponse>;
  get(request: IAuthenticatedRequest): Promise<IResponse>;
  delete(request: IAuthenticatedRequest): Promise<IDeleteResponse>;
}
