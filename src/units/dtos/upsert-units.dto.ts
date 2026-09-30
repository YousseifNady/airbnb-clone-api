import {
    IsArray,
    IsBoolean,
    IsInt,
    IsMongoId,
    IsNotEmpty,
    IsNumber,
    IsString,
    Min,
} from 'class-validator';

export class UpsertUnitsDto {
    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;

    @IsString()
    @IsNotEmpty()
    address!: string;

    @IsArray()
    @IsString({ each: true })
    photos!: string[];

    @IsNumber()
    @Min(1)
    cost_per_day!: number;

    @IsMongoId()
    country_id!: string;

    @IsMongoId()
    city_id!: string;

    @IsMongoId()
    unit_category_id!: string;

    @IsMongoId()
    user_id!: string;

    @IsInt()
    @Min(1)
    rooms_count!: number;

    @IsInt()
    @Min(1)
    adults_count!: number;

    @IsInt()
    @Min(0)
    kidsCount!: number;

    @IsBoolean()
    has_internet_service?: boolean;

    @IsBoolean()
    has_kitchen?: boolean;

    @IsBoolean()
    has_private_garage?: boolean;

    @IsBoolean()
    availability?: boolean;

    @IsBoolean()
    is_active?: boolean;
}