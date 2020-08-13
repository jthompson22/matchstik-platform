import IFileUpload from '../interfaces/IFileUpload';

const fileUpload = (): IFileUpload => {
  return {
    blob: "",
    url: "",
    keys: [],
  };
}

export default fileUpload;
