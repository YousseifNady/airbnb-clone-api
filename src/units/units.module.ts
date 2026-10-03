import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UnitsController } from './units.controller';
import { UnitsService } from './units.service';
import { UnitPhotosService } from './unit-photos.service';
import { Unit, UnitSchema } from './schema/unit.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Unit.name, schema: UnitSchema }]),
  ],
  controllers: [UnitsController],
  providers: [UnitsService, UnitPhotosService],
})
export class UnitsModule {}
