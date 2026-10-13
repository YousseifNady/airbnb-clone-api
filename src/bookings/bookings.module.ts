import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { StoreBookingsService } from './services/store-booking.service';
import { BookingPricingService } from './services/booking-pricing.service';

@Module({
  providers: [
    BookingsService,
    StoreBookingsService,
    BookingPricingService
  ],
  controllers: [BookingsController]
})
export class BookingsModule {}
