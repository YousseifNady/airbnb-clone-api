import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { AppSettingsService } from './app-settings.service';
import { AppSettingsDto } from './dtos/app-settings.dto';
import { UpsertAppSettingDto } from './dtos/upsert-app-settings.dto';
import { Role } from '../auth/decorators/role.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Roles } from '../common/enums/role.enum';

@Controller('app-settings')
@UseGuards(AuthGuard)
@Role(Roles.SYSTEM_ADMIN)
export class AppSettingsController {
    constructor(
        private readonly appSettingsService: AppSettingsService
    ) {}

    @Get()
    getAppSettings(): Promise<AppSettingsDto|null> {
        return this.appSettingsService.get();
    }

    @Put()
    upsertAppSettings(
        @Body() body: UpsertAppSettingDto 
    ): Promise<AppSettingsDto> {
        return this.appSettingsService.upsert(body);
    }
}
