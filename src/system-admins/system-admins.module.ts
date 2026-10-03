import { Module } from '@nestjs/common';
import { SystemAdminsService } from './system-admins.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SystemAdmin, SystemAdminSchema } from './schema/system-admins.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SystemAdmin.name,
        schema: SystemAdminSchema,
      },
    ]),
  ],
  providers: [SystemAdminsService],
  exports: [SystemAdminsService],
})
export class SystemAdminsModule {}
