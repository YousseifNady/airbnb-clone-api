import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Booking } from "../schemas/booking.schema";
import { Model } from "mongoose";
import { Unit } from "../../units/schema/unit.schema";
import { IPrincipal } from "../../auth/interfaces/principal.interface";
import { StoreBookingDto } from "../dtos/store-bookings.dto";
import { BookingStatus } from "../enums/booking-status.enum";
import { BookingPricingService } from "./booking-pricing.service";

@Injectable()
export class StoreBookingsService {
  constructor(
    @InjectModel(Booking.name)
    private readonly bookingsModel: Model<Booking>,

    @InjectModel(Unit.name)
    private readonly unitsModel: Model<Unit>,

    private readonly bookingPricingService: BookingPricingService,
  ) {}

  async store(principal: IPrincipal, data: StoreBookingDto) {
    const unit = await this.unitsModel.findById(data.unit_id);

    if (!unit) {
      throw new BadRequestException('Unit not found');
    }

    this.checkBookOwn(principal, unit);
    this.checkCapacity(data, unit);

    await this.checkAvailability(data);

    const pricing = await this.bookingPricingService.calculate(
      unit,
      data.check_in,
      data.check_out,
    );

    return this.bookingsModel.create({
      user_id: principal.user._id,
      unit_id: unit._id,
      check_in: data.check_in,
      check_out: data.check_out,
      adults_count: data.adults_count,
      kids_count: data.kids_count,
      ...pricing,
      status: BookingStatus.PENDING,
    });
  }

  private checkBookOwn(principal: IPrincipal, unit: Unit) {
    if (String(unit.user_id) === String(principal.user._id)) {
      throw new BadRequestException(
        'You cannot book your own unit',
      );
    }
  }

  private checkCapacity(data: StoreBookingDto, unit: Unit) {
    if (
      unit.adults_count < data.adults_count ||
      unit.kids_count < data.kids_count
    ) {
      throw new BadRequestException('Unit capacity is insufficient');
    }
  }

  private async checkAvailability(data: StoreBookingDto) {
    const overlappingBookings = await this.bookingsModel.find({
      unit_id: data.unit_id,
      status: {
        $in: [BookingStatus.PENDING, BookingStatus.CONFIRMED],
      },
      check_in: { $lt: data.check_out },
      check_out: { $gt: data.check_in },
    }).limit(1);

    if (overlappingBookings.length > 0) {
      throw new BadRequestException(
        'Unit is not available for the selected dates',
      );
    }
  }
}