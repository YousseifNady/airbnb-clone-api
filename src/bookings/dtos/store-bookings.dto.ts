import { IsDateString, IsMongoId, IsNotEmpty, IsOptional } from "class-validator";
import { IsBefore } from "../decorators/is-before.decorator";
import { IsAfter } from "../decorators/is-after.decorator";


export class StoreBookingDto {
    @IsNotEmpty()
    @IsMongoId()
    unit_id!: string;
    
    @IsOptional()
    @IsDateString()
    @IsBefore('check_out')
    check_in!: Date;
    
    @IsOptional()
    @IsDateString()
    @IsAfter('check_in')
    check_out!: Date;

    @IsOptional()
    adults_count!: number;

    @IsOptional()
    kids_count!: number;
}