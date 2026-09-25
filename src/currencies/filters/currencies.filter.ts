import { FilterQuery } from "mongoose";
import { Currency } from "../schema/currencies.schema";
import { GetCurrencyDto } from "../dtos/get-currency.dto";

export class CurrencyFilter {
    static build(query: GetCurrencyDto): FilterQuery<Currency> {
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