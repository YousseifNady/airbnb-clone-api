import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { Booking } from './schemas/booking.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Pagination } from '../common/helpers/pagination.helper';
import { BookingsDto } from './dtos/bookings.dto';
import { FindAllBookingsDto } from './dtos/find-all-bookings.dto';
import { BookingFilter } from './filters/bookings.filter';
import { FindMineBookingsDto } from './dtos/find-mine-bookings.dto';
import { MineBookingFilter } from './filters/mine-bookings.filter';
import { IPrincipal } from '../auth/interfaces/principal.interface';
import { Unit } from '../units/schema/unit.schema';
import { BadRequestException } from '../common/exceptions/bad-request.exception';
import { plainToInstance } from 'class-transformer';
import { StoreBookingDto } from './dtos/store-bookings.dto';

@Injectable()
export class BookingsService {
    constructor(
        @InjectModel(Booking.name)
        private readonly bookingsModel: Model<Booking>,
        @InjectModel(Unit.name)
        private readonly unitsModel: Model<Unit>
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

    async show(id: Types.ObjectId, principal: IPrincipal) {
        const booking = await this.bookingsModel.findById(id);

        if(!booking) throw new BadRequestException('Booking not found');

        if(! this.canShowBooking(principal, booking)) throw new BadRequestException('You can not show this booking');

        return plainToInstance(BookingsDto, booking);
    }

    canShowBooking(
        principal: IPrincipal,
        booking: Booking,
    ): boolean {
        return booking.guest_id.toString() === principal.user._id || booking.host_id.toString() === principal.user._id;
    }

    update(
        principal: IPrincipal,
        data: StoreBookingDto
    ) {

    }
}
