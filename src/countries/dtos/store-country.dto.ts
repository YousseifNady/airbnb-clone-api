import { IsNotEmpty, IsString } from "class-validator";

export class StoreCountryDto {
    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsNotEmpty()
    @IsString()
    country_code!: string
}