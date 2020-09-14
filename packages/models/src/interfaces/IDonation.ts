import IMetaData from "./IMetaData";
import { DonorTypeEnum } from "../enums/DonorTypeEnum";

export default interface IDonation {
  _id?: string;
  organizationId: string;
  donorType: DonorTypeEnum;
  email?: string;
  name?: string;
  amount: number;
  message: string;
  stripeChargeId?: string;
  meta: IMetaData;
}
