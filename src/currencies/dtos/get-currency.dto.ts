import { IsOptional, IsString } from "class-validator";
import { PaginationDto } from "../../common/dtos/pagination.dto";

export class GetCurrencyDto extends PaginationDto {
    @IsString()
    @IsOptional()
    name!: string;
}