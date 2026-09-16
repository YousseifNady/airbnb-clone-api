import { IsOptional, IsString } from "class-validator";
import { PaginationDto } from "../../common/dtos/pagination.dto";

export class GetCountryDto extends PaginationDto {
    @IsString()
    @IsOptional()
    name!: string;
}