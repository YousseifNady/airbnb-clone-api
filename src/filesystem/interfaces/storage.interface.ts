import { IStorageFile } from './file-storage.interface';

export interface IStorageDriver {
  upload(file: IStorageFile, directory: string): Promise<string>;
  delete(path: string): Promise<void>;
  url(path: string): string;
}
