import { FilterQuery } from "mongoose";
import { City } from "../schema/cities.schema";
import { GetCityDto } from "../dtos/get-city.dto";

export class CityFilter {
    static build(query: GetCityDto): FilterQuery<City> {
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