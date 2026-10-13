import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { FindAllBookingsDto } from './dtos/find-all-bookings.dto';
import { FindMineBookingsDto } from './dtos/find-mine-bookings.dto';
import { CurrentAuthenticated, Principal } from '../auth/decorators/current-authenticated.decorator';
import { StoreBookingDto } from './dtos/store-bookings.dto';
import { StoreBookingsService } from './services/store-booking.service';

@Controller('bookings')
export class BookingsController {
    constructor(
        private readonly bookingsService: BookingsService,
        private readonly storeBookingsService: StoreBookingsService
    ) {}

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

    @Post('/')
    store(
        @Body() data: StoreBookingDto,
        @CurrentAuthenticated() principal: Principal
    ) {
        return this.storeBookingsService.store(principal, data);
    }
}
