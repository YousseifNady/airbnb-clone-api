import { IsNotEmpty, IsString } from "class-validator";

export class UpdateOrStoreCityDto {
    @IsNotEmpty()
    @IsString()
    name!: string;
}