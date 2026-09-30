import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configOptions from './common/config/options.config';
import { CustomExceptionFilter } from './common/filters/custom-exception.filter';
import { MongooseModule } from '@nestjs/mongoose';
import mongoOptions from './common/config/mongo-db.config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ResponseInterceptor } from './common/interceptors/response.nterceptor';
import { getValidationPipeConfig } from './common/config/validation-pipe.config';
import { APP_FILTER, APP_PIPE, APP_INTERCEPTOR } from '@nestjs/core';
import { CountriesModule } from './countries/countries.module';
import { CitiesModule } from './cities/cities.module';
import { SystemAdimnsModule } from './system-adimns/system-adimns.module';
import { AppSettingsModule } from './app-settings/app-settings.module';
import { CurrenciesModule } from './currencies/currencies.module';
import { UnitCategoriesModule } from './unit-categories/unit-categories.module';
import { UnitsModule } from './units/units.module';

@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    MongooseModule.forRootAsync(mongoOptions),
    UsersModule,
    AuthModule,
    CountriesModule,
    CitiesModule,
    SystemAdimnsModule,
    AppSettingsModule,
    CurrenciesModule,
    UnitCategoriesModule,
    UnitsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_PIPE,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return new ValidationPipe(getValidationPipeConfig(configService));
      },
    },
  ],
})
export class AppModule { }
