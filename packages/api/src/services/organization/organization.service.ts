import StatusCodeEnum from "@matchstik/models/.dist/enums/StatusCodeEnum";
import { joiToError, toError } from "@matchstik/models/.dist/interfaces/common";
import IOrganization from '@matchstik/models/.dist/interfaces/IOrganization';
import * as IOrganizationService from '@matchstik/models/.dist/services/IOrganizationService';
import Joi from 'joi';
import { IAppServiceProxy } from '../appServiceProxy';
import OrganizationStore from './organization.store';

const organizationSchema = Joi.object().keys({
  _id: Joi.string().optional(),
  userId: Joi.string().optional(),
  createdAt: Joi.date().optional(),
  name: Joi.string()
    .required()
    .error(() => new Error("Your team must have a name.")),
  email: Joi.string()
    .required()
    .error(() => new Error("Your team must have an email.")),
  phoneNumber: Joi.string()
    .optional()
    .error(() => new Error("Your team must have a phone number.")),
  description: Joi.string()
    .optional()
    .error(() => new Error("Your team must have a description.")),
  address: Joi.string()
    .optional()
    .allow('')
    .error(() => new Error("Your team must have an address.")),
});

const authenticatedSchema = Joi.object().keys({
  userId: Joi.string().required(),
  organizationId: Joi.string().required(),
});

export default class OrganizationController implements IOrganizationService.IOrganizationServiceAPI {
  private storage = new OrganizationStore();
  private proxy: IAppServiceProxy;

  constructor(proxy: IAppServiceProxy) {
    this.proxy = proxy;
  }

  public create = async (request: IOrganizationService.ICreateOrganizationRequest): Promise<IOrganizationService.ICreateOrganizationResponse> => {
    let response: IOrganizationService.ICreateOrganizationResponse;

    const schema = Joi.object().keys({
      auth: authenticatedSchema,
      organization: organizationSchema,
    });

    const params = Joi.validate(request, schema);
    const { organization }: { organization: IOrganization } = params.value;

    if (params.error) {
      console.error(params.error);
      response = {
        status: StatusCodeEnum.UNPROCESSABLE_ENTITY,
        error: joiToError(params.error),
      };
      return response;
    }

    /**
    * Save the organization to storage
    */
    const now = Date.now();
    organization.meta = {
      createdBy: organization.userId,
      createdAt: now,
      lastUpdatedBy: organization.userId,
      lastUpdatedAt: now,
    };

    try {
      const newOrg = await this.storage.create(organization);
      response = {
        status: StatusCodeEnum.OK,
        organization: newOrg
      };
      return response;
    } catch (e) {
      console.error(e);
      response = {
        status: StatusCodeEnum.INTERNAL_SERVER_ERROR,
        error: toError(e.message),
      };
      return response;
    }
  }

  public update = async (request: IOrganizationService.IUpdateOrganizationRequest): Promise<IOrganizationService.IUpdateOrganizationResponse> => {
    let response: IOrganizationService.IUpdateOrganizationResponse;

    const schema = Joi.object().keys({
      userId: Joi.string().required(),
      organization: organizationSchema,
    });

    const params = Joi.validate(request, schema);
    const { userId, organization }: { userId: string, organization: IOrganization } = params.value;

    if (params.error) {
      console.error(params.error);
      response = {
        status: StatusCodeEnum.UNPROCESSABLE_ENTITY,
        error: joiToError(params.error),
      };
      return response;
    }

    try {
      const newOrg = await this.storage.update(userId, organization);
      response = {
        status: StatusCodeEnum.OK,
        organization: newOrg
      };
      return response;
    } catch (e) {
      console.error(e);
      response = {
        status: StatusCodeEnum.INTERNAL_SERVER_ERROR,
        error: toError(e.message),
      };
      return response;
    }
  }

  public list = async (request: IOrganizationService.IListOrganizationsRequest): Promise<IOrganizationService.IListOrganizationsResponse> => {
    let response: IOrganizationService.IListOrganizationsResponse;

    const schema = Joi.object().keys({
      userId: Joi.string().optional(),
    });

    const params = Joi.validate(request, schema);
    const { userId }: { userId: string } = params.value;

    if (params.error) {
      console.error(params.error);
      response = {
        status: StatusCodeEnum.UNPROCESSABLE_ENTITY,
        error: joiToError(params.error),
      };
      return response;
    }

    try {
      const organizations = await this.storage.list(userId || null);
      response = {
        status: StatusCodeEnum.OK,
        organizations,
      };
      return response;
    } catch (e) {
      console.error(e);
      response = {
        status: StatusCodeEnum.INTERNAL_SERVER_ERROR,
        error: toError(e.message),
      };
      return response;
    }
  }

  public get = async (request: IOrganizationService.IGetOrganizationRequest): Promise<IOrganizationService.IGetOrganizationResponse> => {
    let response: IOrganizationService.IGetOrganizationResponse;

    const schema = Joi.object().keys({
      auth: authenticatedSchema,
      organizationId: Joi.string().allow(null).required(),
    });

    const params = Joi.validate(request, schema);
    const { organizationId }: { organizationId: string } = params.value;

    if (params.error) {
      console.error(params.error);
      response = {
        status: StatusCodeEnum.UNPROCESSABLE_ENTITY,
        error: joiToError(params.error),
      };
      return response;
    }

    try {
      const organization = await this.storage.get(organizationId);
      response = {
        status: StatusCodeEnum.OK,
        organization,
      };
      return response;
    } catch (e) {
      console.error(e);
      response = {
        status: StatusCodeEnum.INTERNAL_SERVER_ERROR,
        error: toError(e.message),
      };
      return response;
    }
  }

  public delete = async (request: IOrganizationService.IDeleteOrganizationRequest): Promise<IOrganizationService.IDeleteOrganizationResponse> => {
    let response: IOrganizationService.IDeleteOrganizationResponse;

    const schema = Joi.object().keys({
      userId: Joi.string().required(),
      organizationId: Joi.string().required(),
    });

    const params = Joi.validate(request, schema);
    const { userId, organizationId }: { userId: string, organizationId: string } = params.value;

    if (params.error) {
      console.error(params.error);
      response = {
        status: StatusCodeEnum.UNPROCESSABLE_ENTITY,
        error: joiToError(params.error),
        deleted: false,
      };
      return response;
    }

    try {
      const deleted = await this.storage.delete(userId, organizationId);
      response = {
        status: StatusCodeEnum.OK,
        deleted,
      };
      return response;
    } catch (e) {
      console.error(e);
      response = {
        status: StatusCodeEnum.INTERNAL_SERVER_ERROR,
        error: toError(e.message),
        deleted: null,
      };
      return response;
    }
  }
}
