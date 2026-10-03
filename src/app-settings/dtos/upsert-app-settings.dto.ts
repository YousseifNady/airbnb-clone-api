import { IsNumber, IsOptional, Min, Max } from 'class-validator';

export class UpsertAppSettingDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(25)
  vat_rate!: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  min_price!: number;
}
