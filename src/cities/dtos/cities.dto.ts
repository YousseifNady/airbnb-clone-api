import { Expose, Transform } from "class-transformer";
import { CountriesDto } from "../../countries/dtos/countries.dto";

export class CitiesDto {
    @Expose()
    @Transform(({ obj }) => obj._id.toString())
    id!: string;

    @Expose()
    name!: string;

    @Expose()
    country_id!: CountriesDto;
}