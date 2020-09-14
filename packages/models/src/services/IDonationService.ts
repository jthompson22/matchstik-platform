import IDonation from '../interfaces/IDonation';
import { DonorTypeEnum } from "../enums/DonorTypeEnum";
import {
  IRequest,
  IResponse,
  IAuthenticatedRequest,
  IAuthorizedRequest,
} from '../interfaces/common';

export interface IDonationServiceAPI {
  create(request: ICreateDonationRequest): Promise<ICreateDonationResponse>;
  list(request: IListDonationsRequest): Promise<IListDonationsResponse>;
  get(request: IGetDonationRequest): Promise<IGetDonationResponse>;
}

/********************************************************************************
*  Create Donation
********************************************************************************/

export interface ICreateDonationParams {
  organizationId: string;
  donorType: DonorTypeEnum;
  email?: string;
  name?: string;
  amount: number;
  message: string;
}

export interface ICreateDonationRequest extends IAuthenticatedRequest {
  params: ICreateDonationParams;
}

export interface ICreateDonationResponse extends IResponse {
  donoation?: IDonation;
}

/********************************************************************************
*  List Donations
********************************************************************************/

export interface IListDonationsRequest extends IRequest {
  userId: string;
}

export interface IListDonationsResponse extends IResponse {
  IDonations?: IDonation[];
}

/********************************************************************************
*  Get Donation
********************************************************************************/

export interface IGetDonationRequest extends IAuthorizedRequest {
  organizationId: string;
}

export interface IGetDonationResponse extends IResponse {
  donation?: IDonation;
}
