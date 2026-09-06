import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configOptions from './common/config/options.config';
import { CustomExceptionFilter } from './common/filters/custom-exception.filter';
import { MongooseModule } from '@nestjs/mongoose';
import mongoOptions from './common/config/mongo-db.config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ResponseInterceptor } from './common/interceptors/response.nterceptor';

@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    MongooseModule.forRootAsync(mongoOptions),
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: 'APP_FILTER',
      useClass: CustomExceptionFilter,
    },
    {
      provide: 'APP_INTERCEPTOR',
      useClass: ResponseInterceptor,
    }
  ],
})
export class AppModule {}
