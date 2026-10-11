import { FilterQuery } from 'mongoose';
import { Booking } from '../schemas/booking.schema';
import { FindAllBookingsDto } from '../dtos/find-all-bookings.dto';
import { FindMineBookingsDto } from '../dtos/find-mine-bookings.dto';
import { IPrincipal } from '../../auth/interfaces/principal.interface';

export class MineBookingFilter {
  static build(principal: IPrincipal, query: FindMineBookingsDto): FilterQuery<Booking> {
    const filter: FilterQuery<Booking> = {
      $or: [
        {
          guest: principal.user._id.toString(),
          host: principal.user._id.toString()
        }
      ]
    };

    if (query.unit_id) {
      filter.unit_id = query.unit_id;
    }
    
    if (query.status) {
      filter.status = query.status;
    }
    
    if (query.check_in) {
      filter.check_in = query.check_in;
    }
    
    if (query.check_out) {
      filter.check_out = query.check_out;
    }

    return filter;
  }
}
