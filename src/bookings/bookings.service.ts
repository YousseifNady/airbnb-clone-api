import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Booking } from './schemas/booking.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Pagination } from '../common/helpers/pagination.helper';
import { BookingsDto } from './dtos/bookings.dto';
import { FindAllBookingsDto } from './dtos/find-all-bookings.dto';
import { BookingFilter } from './filters/bookings.filter';
import { FindMineBookingsDto } from './dtos/find-mine-bookings.dto';
import { MineBookingFilter } from './filters/mine-bookings.filter';
import { IPrincipal } from '../auth/interfaces/principal.interface';

@Injectable()
export class BookingsService {
    constructor(
        @InjectModel(Booking.name)
        private readonly bookingsModel: Model<Booking>
    ) {}

    async findAll(data: FindAllBookingsDto) {
        const filter = BookingFilter.build(data);
    
        const query = this.bookingsModel
            .find(filter)
            .sort({created_at: -1})
            .populate([
                {
                    path: 'unit',
                    select: 'title'
                },
                {
                    path: 'guest',
                    select: 'name phone'
                },
                {
                    path: 'host',
                    select: 'name phone'
                }
            ])
            .lean();
    
        return new Pagination(query, BookingsDto, data.page, data.limit)
            .get();
    }

    async findMine(principal: IPrincipal, data: FindMineBookingsDto) {
        const filter = MineBookingFilter.build(principal, data);
    
        const query = this.bookingsModel
            .find(filter)
            .sort({created_at: -1})
            .populate([
                {
                    path: 'unit',
                    select: 'title'
                },
                {
                    path: 'guest',
                    select: 'name phone'
                },
                {
                    path: 'host',
                    select: 'name phone'
                }
            ])
            .lean();
    
        return new Pagination(query, BookingsDto, data.page, data.limit)
            .get();
    }
}
