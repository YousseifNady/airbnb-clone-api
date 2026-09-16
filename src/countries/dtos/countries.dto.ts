import { Expose, Transform } from "class-transformer";

export class CountriesDto {
    @Expose()
    @Transform(({ obj }) => obj._id.toString())
    id!: string;

    @Expose()
    name!: string;

    @Expose()
    country_code!: string;
}