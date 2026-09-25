import { IsNotEmpty, IsString } from "class-validator";

export class UpsertUnitCategoryDto {
    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsNotEmpty()
    @IsString()
    icon!: string
}