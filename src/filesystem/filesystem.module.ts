import { Global, Module } from '@nestjs/common';
import { FilesystemService } from './filesystem.service';
import { FileStorageDriver } from './drivers/file.driver';
import { S3StorageDriver } from './drivers/s3.driver';

@Global()
@Module({
  providers: [FilesystemService, FileStorageDriver, S3StorageDriver],
  exports: [FilesystemService],
})
export class FilesystemModule {}
