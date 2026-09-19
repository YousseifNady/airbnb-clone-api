import { FilterQuery } from "mongoose";
import { Country } from "../schema/countries.schema";
import { GetCountryDto } from "../dtos/get-country.dto";

export class CountryFilter {
    static build(query: GetCountryDto): FilterQuery<Country> {
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