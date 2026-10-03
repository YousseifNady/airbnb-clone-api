import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../common/dtos/pagination.dto';

export class FindAllCurrenciesDto extends PaginationDto {
  @IsString()
  @IsOptional()
  name!: string;
}
