import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';

const mongoUriFactory = (configService: ConfigService): string => {
  const HOST = configService.getOrThrow<string>('MONGO_HOST');
  const PORT = configService.getOrThrow<number>('MONGO_PORT');
  const DB = configService.getOrThrow<string>('MONGO_DB');
  return `mongodb://${HOST}:${PORT}/${DB}`;
};

const mongoOptions: MongooseModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    uri: mongoUriFactory(configService),
  }),
};

export default mongoOptions;
