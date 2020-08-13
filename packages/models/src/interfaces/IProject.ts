import IMetaData from './IMetaData';
export default interface IProject {
  _id?: string;
  organizationId: string;
  active?: boolean;
  name: string;
  description?: string;
  fileIds: string[];
  meta?: IMetaData;
}
