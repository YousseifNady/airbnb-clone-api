import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configOptions from './config/config.options';

@Module({
  imports: [
    ConfigModule.forRoot(configOptions)
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
