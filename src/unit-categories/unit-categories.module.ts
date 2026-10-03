import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UnitCategoriesController } from './unit-categories.controller';
import { UnitCategoriesService } from './unit-categories.service';
import {
  UnitCategory,
  UnitCategorySchema,
} from './schema/unit-categories.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UnitCategory.name, schema: UnitCategorySchema },
    ]),
  ],
  controllers: [UnitCategoriesController],
  providers: [UnitCategoriesService],
})
export class UnitCategoriesModule {}
