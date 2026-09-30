import { IsNotEmpty, IsString } from "class-validator";

export class UpsertCountriesDto {
    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsNotEmpty()
    @IsString()
    country_code!: string
}