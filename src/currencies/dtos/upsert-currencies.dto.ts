import { IsNotEmpty, IsString } from "class-validator";

export class UpsertCurrenciesDto {
    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsNotEmpty()
    @IsString()
    currency_code!: string
}