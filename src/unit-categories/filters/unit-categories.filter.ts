import { FilterQuery } from 'mongoose';
import { UnitCategory } from '../schema/unit-categories.schema';
import { FindAllUnitCategoriesDto } from '../dtos/find-all-unit-categories.dto';

export class UnitCategoryFilter {
  static build(query: FindAllUnitCategoriesDto): FilterQuery<UnitCategory> {
    const filter: FilterQuery<UnitCategory> = {};

    if (query.name) {
      filter.name = {
        $regex: query.name,
        $options: 'i',
      };
    }

    return filter;
  }
}
