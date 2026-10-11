import { Controller, Get, Query } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { FindAllBookingsDto } from './dtos/find-all-bookings.dto';
import { FindMineBookingsDto } from './dtos/find-mine-bookings.dto';
import { CurrentAuthenticated, Principal } from '../auth/decorators/current-authenticated.decorator';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

    @Get('/')
    findAll(@Query() queryParams: FindAllBookingsDto) {
        return this.bookingsService.findAll(queryParams);
    }

    @Get('/mine')
    findMine(
        @Query() queryParams: FindMineBookingsDto,
        @CurrentAuthenticated() principal: Principal
    ) {
        return this.bookingsService.findMine(principal, queryParams);
    }
}
