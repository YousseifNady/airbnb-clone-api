import { IsEnum, IsMongoId, IsOptional } from "class-validator";
import { PaginationDto } from "../../common/dtos/pagination.dto";
import { BookingStatus } from "../enums/booking-status.enum";

export class FindAllBookingsDto extends PaginationDto {
    @IsOptional()
    @IsMongoId()
    unit_id!: string;
    
    @IsOptional()
    @IsEnum(BookingStatus)
    status?: BookingStatus;

    @IsOptional()
    check_in!: Date;

    @IsOptional()
    check_out!: Date;
}