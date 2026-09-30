import { IsNotEmpty, IsString } from "class-validator";

export class UpsertUnitCategoriesDto {
    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsNotEmpty()
    @IsString()
    icon!: string
}