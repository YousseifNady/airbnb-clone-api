import { BookingStatus } from "../enums/booking-status.enum";

export class BookingsDto {
  _id!: string;
  unit!: string;
  guest!: string;
  host!: string;
  check_in!: number | Date;
  check_out!: number | Date;
  adults_count?: number;
  kids_count?: number;
  notes?: string;
  price_per_day!: number;
  days_count!: number;
  booking_amount!: number;
  vat!: number;
  vat_amount!: number;
  total_amount!: number;
  status!: BookingStatus;
  cancellation_reason?: string;
}