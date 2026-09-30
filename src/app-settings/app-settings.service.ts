import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { AppSetting } from './schema/app-settings.schema';
import { InjectModel } from '@nestjs/mongoose';
import { AppSettingsDto } from './dtos/app-settings.dto';
import { UpsertAppSettingDto } from './dtos/upsert-app-settings.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AppSettingsService {
    constructor(
        @InjectModel(AppSetting.name)
        private readonly appSettingsModel: Model<AppSetting>
    ) {}

    async findAll(): Promise<AppSettingsDto|null> {
        return await this.appSettingsModel.findOne();
    }

    async upsert(data: UpsertAppSettingDto): Promise<AppSettingsDto> {
        const appSettings = await this.appSettingsModel.findOneAndUpdate(
            {},
            { $set: data },
            { upsert: true, returnDocument: 'after', lean: true }
        );

        return plainToInstance(AppSettingsDto, appSettings);
    }
}
