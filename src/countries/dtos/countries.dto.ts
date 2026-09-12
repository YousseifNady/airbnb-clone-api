import { Expose } from "class-transformer";

export class CountriesDto {
    @Expose()
    id!: string;

    @Expose()
    name!: string;

    @Expose()
    country_code!: string;
}