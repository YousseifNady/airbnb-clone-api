import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModuleAsyncOptions } from "@nestjs/mongoose";

const mongoUriFactory = (configService: ConfigService): string => {
    const HOST = configService.get('MONGO_HOST');
    const PORT = configService.get('MONGO_PORT');
    const DB = configService.get('MONGO_DB');
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