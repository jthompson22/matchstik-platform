import IMetaData from "./IMetaData";

export default interface IProject {
  _id?: string;
  organizationId: string;
  active?: boolean;
  name: string;
  description?: string;
  audioHttpUrl?: string;
  audioGSUrl?: string;
  originalTextHttpUrl?: string;
  originalTextGSUrl?: string;
  text?: string;
  meta?: IMetaData;
};
