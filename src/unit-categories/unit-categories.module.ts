import { Module } from '@nestjs/common';
import { UnitCategoriesController } from './unit-categories.controller';
import { UnitCategoriesService } from './unit-categories.service';

@Module({
  controllers: [UnitCategoriesController],
  providers: [UnitCategoriesService]
})
export class UnitCategoriesModule {}
