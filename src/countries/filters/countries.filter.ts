import { FilterQuery } from "mongoose";
import { Country } from "../schema/countries.schema";
import { FindAllCountriesDto } from "../dtos/find-all-countries.dto";

export class CountryFilter {
    static build(query: FindAllCountriesDto): FilterQuery<Country> {
        const filter: FilterQuery<Country> = {};

        if (query.name) {
            filter.name = {
                $regex: query.name,
                $options: 'i',
            };
        }

        return filter;
    }
}