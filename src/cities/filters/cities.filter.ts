import { FilterQuery } from "mongoose";
import { City } from "../schema/cities.schema";
import { FindAllCitiesDto } from "../dtos/find-all-cities.dto";

export class CityFilter {
    static build(query: FindAllCitiesDto): FilterQuery<City> {
        const filter: FilterQuery<City> = {};

        if (query.name) {
            filter.name = {
                $regex: query.name,
                $options: 'i',
            };
        }

        if (query.country_id) {
            filter.country_id = query.country_id;
        }

        return filter;
    }
}