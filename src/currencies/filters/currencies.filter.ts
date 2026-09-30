import { FilterQuery } from "mongoose";
import { Currency } from "../schema/currencies.schema";
import { FindAllCurrenciesDto } from "../dtos/find-all-currencies.dto";

export class CurrencyFilter {
    static build(query: FindAllCurrenciesDto): FilterQuery<Currency> {
        const filter: FilterQuery<Currency> = {};

        if (query.name) {
            filter.name = {
                $regex: query.name,
                $options: 'i',
            };
        }

        return filter;
    }
}