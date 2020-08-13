import StatusCodeEnum from './../enums/StatusCodeEnum';

export interface IRequest {}

export interface IResponse {
  status: StatusCodeEnum;
  error?: IError;
}

export interface IAuthenticationData {
  userId: string;
}

export interface IAuthorizationData extends IAuthenticationData {
  organizationId: string;
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

export interface IError {
  message: string
}

export interface IResourceAPI {
  create(request: IAuthenticatedRequest): Promise<IResponse>;
  update(request: IAuthenticatedRequest): Promise<IResponse>;
  list(request: IAuthenticatedRequest): Promise<IResponse>;
  get(request: IAuthenticatedRequest): Promise<IResponse>;
  delete(request: IAuthenticatedRequest): Promise<IDeleteResponse>;
}

export function joiToError(joiError: any): IError {
  let message = 'There was an error processing your request. Please contact support.';
  if (joiError && joiError.details && joiError.details[0]) {
    message = joiError.details[0].message;
  } else {
    message = joiError.message;
  }

  const error: IError = {
    message,
  };

  return error;
}

export function toError(message: string): IError {
  const error: IError = {
    message,
  };

  return error;
}
