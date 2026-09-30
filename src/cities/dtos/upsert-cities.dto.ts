import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class UpsertCitiesDto {
    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsNotEmpty()
    @IsMongoId()
    country_id!: string;
}