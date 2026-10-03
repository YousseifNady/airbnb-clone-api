import {
  IsBoolean,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from '../../common/dtos/pagination.dto';

export class FindAllUnitsDto extends PaginationDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsMongoId()
  country_id?: string;

  @IsOptional()
  @IsMongoId()
  city_id?: string;

  @IsOptional()
  @IsMongoId()
  unit_category_id?: string;

  @IsOptional()
  @IsMongoId()
  user_id?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  min_cost_per_day?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  max_cost_per_day?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  min_rooms_count?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  max_rooms_count?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  min_adults_count?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  max_adults_count?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  min_kids_count?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  max_kids_count?: number;

  @IsOptional()
  @IsBoolean()
  has_internet_service?: boolean;

  @IsOptional()
  @IsBoolean()
  has_kitchen?: boolean;

  @IsOptional()
  @IsBoolean()
  has_private_garage?: boolean;

  @IsOptional()
  @IsBoolean()
  availability?: boolean;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
