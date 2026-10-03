import { Module } from '@nestjs/common';
import { FilesystemService } from './filesystem.service';
import { FileStorageDriver } from './drivers/file.driver';
import { S3StorageDriver } from './drivers/s3.driver';

@Module({
  providers: [
    FilesystemService,
    FileStorageDriver,
    S3StorageDriver,
  ]
})
export class FilesystemModule {}
