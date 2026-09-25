import { IsNumber, IsOptional } from "class-validator";

export class UpsertAppSettingDto {
    @IsOptional()
    @IsNumber()
    vat_rate!: string;

    @IsOptional()
    @IsNumber()
    min_price!: string;
}