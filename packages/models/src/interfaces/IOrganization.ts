import IMetaData from "./IMetaData";

export default interface IOrganization {
  _id?: string;
  userId: string;
  active?: boolean;
  name: string;
  description?: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
  logoUrl?: string;
  meta?: IMetaData;
};
