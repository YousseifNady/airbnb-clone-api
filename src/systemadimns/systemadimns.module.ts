import { Module } from '@nestjs/common';
import { SystemadimnsService } from './systemadimns.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SystemAdmin, SystemAdminSchema } from './schema/system-admin.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SystemAdmin.name,
        schema: SystemAdminSchema,
      },
    ])
  ],
  providers: [SystemadimnsService]
})
export class SystemadimnsModule { }
