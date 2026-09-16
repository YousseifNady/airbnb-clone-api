import { IsOptional, IsString } from "class-validator";
import { PaginationDto } from "../../common/dtos/pagination.dto";

export class GetCityDto extends PaginationDto {
    @IsString()
    @IsOptional()
    name!: string;

    @IsString()
    @IsOptional()
    country_id!: string;
}