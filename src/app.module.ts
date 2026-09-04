import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configOptions from './common/config/options.config';
import { CustomExceptionFilter } from './common/filters/custom-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot(configOptions)
  ],
  controllers: [],
  providers: [
    {
      provide: 'APP_FILTER',
      useClass: CustomExceptionFilter,
    }
  ],
})
export class AppModule { }
