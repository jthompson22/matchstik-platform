import Joi from 'joi';
import OrganizationStore from '../stores/organization.store';
import {
  toError,
  joiToError,
} from '../models/interfaces/common';
import StatusCodeEnum from "../models/enums/StatusCodeEnum";
import IOrganization from '@matchstik/models/.dist/interfaces/IOrganization';
import IOrganizationAPI, {
  ICreateOrgRequest,
  ICreateOrgResponse,
  IUpdateOrgRequest,
  IUpdateOrgResponse,
  IListOrgsRequest,
  IListOrgsResponse,
  IGetOrgRequest,
  IGetOrgResponse,
  IDeleteOrgRequest,
  IDeleteOrgResponse,
} from '../models/interfaces/IOrganizationAPI';
import { IController } from './controller';

const orgSchema = Joi.object().keys({
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
});

export default class OrganizationController implements IOrganizationAPI {
  private storage = new OrganizationStore();
  private controller;

  constructor(controller: IController) {
    this.controller = controller;
    console.log(this.controller);
  }

  public create = async (request: ICreateOrgRequest): Promise<ICreateOrgResponse> => {
    let response: ICreateOrgResponse;

    const schema = Joi.object().keys({
      auth: authenticatedSchema,
      organization: orgSchema,
    });

    const params = Joi.validate(request, schema);
    const {  organization }: { organization: IOrganization } = params.value;

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
      createdAt: now,
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

  public update = async (request: IUpdateOrgRequest): Promise<IUpdateOrgResponse> => {
    let response: IUpdateOrgResponse;

    const schema = Joi.object().keys({
      userId: Joi.string().required(),
      org: orgSchema,
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

    organization.meta.lastUpdatedAt = Date.now();

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

  public list = async (request: IListOrgsRequest): Promise<IListOrgsResponse> => {
    let response: IListOrgsResponse;

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

  public get = async (request: IGetOrgRequest): Promise<IGetOrgResponse> => {
    let response: IGetOrgResponse;

    const schema = Joi.object().keys({
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

  public delete = async (request: IDeleteOrgRequest): Promise<IDeleteOrgResponse> => {
    let response: IDeleteOrgResponse;

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
