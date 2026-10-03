import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { extname } from 'node:path';
import { randomUUID } from 'node:crypto';
import { IStorageDriver } from '../interfaces/storage.interface';
import { IStorageFile } from '../interfaces/file-storage.interface';

@Injectable()
export class S3StorageDriver implements IStorageDriver {
  private readonly client: S3Client;
  private readonly bucket: string;
  private readonly region: string;

  constructor(private readonly configService: ConfigService) {
    this.region = this.configService.get<string>('AWS_REGION') ?? '';
    this.bucket = this.configService.get<string>('AWS_S3_BUCKET') ?? '';
    this.client = this.initializeClient();
  }

  async upload(file: IStorageFile, directory: string): Promise<string> {
    const extension = extname(file.filename);

    const key = `${directory}/${randomUUID()}${extension}`;

    await this.client.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );

    return key;
  }

  async delete(path: string): Promise<void> {
    await this.client.send(
      new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: path,
      }),
    );
  }

  url(path: string): string {
    return `https://${this.bucket}.s3.${this.region}.amazonaws.com/${path}`;
  }

  private initializeClient(): S3Client {
    return new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: this.configService.getOrThrow<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.getOrThrow<string>(
          'AWS_SECRET_ACCESS_KEY',
        ),
      },
    });
  }
}
