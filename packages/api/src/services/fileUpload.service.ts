import IFile from '../models/interfaces/IFile';
import { Storage } from '@google-cloud/storage';
import { Duplex } from 'stream';
import {
  GCP_BUCKET_NAME,
} from '../env';

if(!GCP_BUCKET_NAME) {
  console.error('No Storage bucket configured');
  process.exit(1);
} else {
  console.log(`Storage Bucket: ${GCP_BUCKET_NAME}`);
}

function bufferToStream(buffer) {
  let stream = new Duplex();
  stream.push(buffer);
  stream.push(null);
  return stream;
}

function getPublicUrl(filename) {
  return `https://storage.googleapis.com/${GCP_BUCKET_NAME}/${filename}`;
}

const storage = new Storage();

class FileUploadService {
  private async uploadToStorage(buffer: Buffer, name: string, mimetype: string): Promise<string>{
    const filename = `${Date.now().toString()}-${name}`;
    console.log(filename);
    const bucket = storage.bucket(GCP_BUCKET_NAME)
    const file = bucket.file(filename);
    const options = {
      gzip: true,
      metadata: {
        cacheControl: 'public, max-age=31536000',
        contentType: mimetype,
      }
    };

    return new Promise((resolve, reject) => {
      bufferToStream(buffer)
        .pipe(file.createWriteStream(options))
        .on('error', function (err) {
          console.log(err); // ignore for now
        })
        .on('finish', function () {
          resolve(getPublicUrl(filename));
        });
    }); 
  }

  public async uploadFiles(files: IFile[]): Promise<IFile[]> {
    return await Promise.all(files.map(async f => {
      const { file, filename, mimetype, encoding } = f;
      return {
        filename,
        mimetype,
        encoding,
        url: await this.uploadToStorage(file, filename, mimetype),
      } as IFile;

    }));
  }
}

export default new FileUploadService();
