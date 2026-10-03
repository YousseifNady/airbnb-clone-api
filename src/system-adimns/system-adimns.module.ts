import { Module } from '@nestjs/common';
import { SystemAdimnsService } from './system-adimns.service';
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
  providers: [SystemAdimnsService],
  exports: [SystemAdimnsService],
})
export class SystemAdimnsModule {}
