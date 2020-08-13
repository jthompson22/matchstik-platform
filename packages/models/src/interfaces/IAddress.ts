import IMetaData from "./IMetaData";

export default interface IAddress {
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  phone?: string;
  lat?: number | null;
  lng?: number | null;
  placeId?: string;
  timezone?: string;
  meta?: IMetaData;
}
