import { memoryStorage } from 'multer';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export const filesystemMulterOptions: MulterOptions = {
  storage: memoryStorage(),
};
