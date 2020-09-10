import StatusCodeEnum from '../../models/enums/StatusCodeEnum';
import IFile  from '../../models/interfaces/IFile';
import {
  ApolloError,
  AuthenticationError,
} from 'apollo-server-express';
import fileUploadService from '../../services/fileUpload.service';

function streamToBuffer(stream): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    let buffers = [];
    stream.on('error', reject);
    stream.on('data', (data) => buffers.push(data));
    stream.on('end', () => resolve(Buffer.concat(buffers)));
  });
}

export default {
  Mutation: {
    async uploadFiles(_, args, context) {
      const { req: { user } } = context;

      console.log(user._id);
      
      if (!user._id) {
        throw new AuthenticationError("Authentication Required.");
      }

      if (!user.organizationId) {
        throw new AuthenticationError("Authorization Required.");
      }
      
      const files: IFile[] = await Promise.all(args.files.map(async file => {
        const { createReadStream, mimetype, filename, encoding} = await file;
        
        const buffer: Buffer = await streamToBuffer(createReadStream());
        return {
          file: buffer,
          mimetype,
          filename,
          encoding,
        } as IFile;
      }));

      let response: IFile[];

      try {
        response = await fileUploadService.uploadFiles(files);
      } catch (e) {
        throw new ApolloError('There was an error uploading your media.', StatusCodeEnum.BAD_REQUEST.toString());
      }

      return response;
    },
  }
};
