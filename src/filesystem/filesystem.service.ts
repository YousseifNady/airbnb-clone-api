import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IStorageDriver } from './interfaces/storage.interface';
import { S3StorageDriver } from './drivers/s3.driver';
import { FileStorageDriver } from './drivers/file.driver';
import { IStorageFile } from './interfaces/file-storage.interface';

@Injectable()
export class FilesystemService {
  private readonly storageDriver: IStorageDriver;

  constructor(private readonly configService: ConfigService) {
    this.storageDriver = this.initialize();
  }

  upload(file: IStorageFile, directory: string): Promise<string> {
    return this.storageDriver.upload(file, directory);
  }

  delete(path: string): Promise<void> {
    return this.storageDriver.delete(path);
  }

  url(path: string): string {
    return this.storageDriver.url(path);
  }

  private initialize(): IStorageDriver {
    const driverType = this.configService.getOrThrow<string>('STORAGE_DRIVER');

    const driversMap: Record<string, () => IStorageDriver> = {
      file: () => new FileStorageDriver(),
      s3: () => new S3StorageDriver(this.configService),
    };

    const initDriver = driversMap[driverType];

    if (!initDriver) {
      throw new InternalServerErrorException(
        `Unsupported storage driver: ${driverType}`,
      );
    }

    return initDriver();
  }
}
