import { IsNotEmpty, IsString } from "class-validator";

export class UpsertCountryDto {
    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsNotEmpty()
    @IsString()
    country_code!: string
}