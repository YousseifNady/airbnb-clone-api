import { mkdir, unlink, writeFile } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { randomUUID } from 'node:crypto';
import { IStorageDriver } from '../interfaces/storage.interface';
import { IStorageFile } from '../interfaces/file-storage.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FileStorageDriver implements IStorageDriver {
    private readonly root = 'storage';

    async upload(
        file: IStorageFile,
        directory: string,
    ): Promise<string> {
        const extension = extname(file.filename);

        const filename = `${randomUUID()}${extension}`;

        const relativePath = join(
            directory,
            filename,
        );

        const fullPath = join(
            this.root,
            relativePath,
        );

        await mkdir(
            join(this.root, directory),
            { recursive: true },
        );

        await writeFile(
            fullPath,
            file.buffer,
        );

        return relativePath;
    }

    async delete(path: string): Promise<void> {
        await unlink(
            join(this.root, path),
        );
    }

    url(path: string): string {
        return `/${this.root}/${path}`;
    }
}