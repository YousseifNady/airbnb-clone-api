import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configOptions from './common/config/options.config';
import { CustomExceptionFilter } from './common/filters/custom-exception.filter';
import { MongooseModule } from '@nestjs/mongoose';
import mongoOptions from './common/config/mongo-db.config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    MongooseModule.forRootAsync(mongoOptions),
    UsersModule,
    AuthModule
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
