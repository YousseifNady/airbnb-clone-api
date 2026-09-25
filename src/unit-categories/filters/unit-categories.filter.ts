import { FilterQuery } from "mongoose";
import { UnitCategory } from "../schema/unit-categories.schema";
import { GetUnitCategoryDto } from "../dtos/get-unit-category.dto";

export class UnitCategoryFilter {
    static build(query: GetUnitCategoryDto): FilterQuery<UnitCategory> {
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