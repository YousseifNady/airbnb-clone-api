import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { FindAllBookingsDto } from './dtos/find-all-bookings.dto';
import { FindMineBookingsDto } from './dtos/find-mine-bookings.dto';
import { CurrentAuthenticated, Principal } from '../auth/decorators/current-authenticated.decorator';
import { StoreBookingDto } from './dtos/store-bookings.dto';
import { StoreBookingsService } from './services/store-booking.service';
import { Types } from 'mongoose';
import { BookingsDto } from './dtos/bookings.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Role } from '../auth/decorators/role.decorator';
import { Roles } from '../common/enums/role.enum';

@Controller('bookings')
@UseGuards(AuthGuard)
@Role(Roles.SYSTEM_ADMIN)
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

    @Get('/:id')
    show(
        @Param('id') id: Types.ObjectId,
        @CurrentAuthenticated() principal: Principal
    ): Promise<BookingsDto> {
        return this.bookingsService.show(id, principal);
    }

    @Put('/:id')
    update(
        @Param('id') id: Types.ObjectId,
        @Body() data: StoreBookingDto,
        @CurrentAuthenticated() principal: Principal
    ) {
        return this.bookingsService.update(principal, data);
    }
}
