import { Injectable } from "@nestjs/common";
import { FilesystemService } from "../filesystem/filesystem.service";

@Injectable()
export class UnitPhotosService {
    constructor(
        private readonly filesystemService: FilesystemService,
    ) {}

    async upload(
        photos: Express.Multer.File[],
    ): Promise<string[]> {
        const uploadedPaths: string[] = [];

        try {
            for (const photo of photos) {
                const path = await this.filesystemService.upload(
                    {
                        buffer: photo.buffer,
                        filename: photo.originalname,
                        mimetype: photo.mimetype,
                        size: photo.size,
                    },
                    'units',
                );

                uploadedPaths.push(path);
            }

            return uploadedPaths;
        } catch (error) {
            await this.delete(uploadedPaths);

            throw error;
        }
    }

    async delete(paths: string[]): Promise<void> {
        if (!paths.length) {
            return;
        }

        await Promise.all(
            paths.map((path) =>
                this.filesystemService.delete(path),
            ),
        );
    }
}