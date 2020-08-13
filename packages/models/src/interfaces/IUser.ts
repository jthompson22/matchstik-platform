import IMetaData from "./IMetaData";

export default interface IUser {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  password?: string;
  passwordHash?: string;
  organizationId: string | null;
  verifyEmailCode?: string | null;
  emailVerifiedAt?: number;
  resetPasswordCode?: string | null;
  resetPasswordCodeSetAt?: number;
  meta?: IMetaData;
};
