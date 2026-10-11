import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Unit } from '../../units/schema/unit.schema';
import { User } from '../../users/schemas/user.schema';
import { BookingStatus } from '../enums/booking-status.enum';
import { CancelBy } from '../enums/cancel-by.enum';

@Schema({
  timestamps: true,
  collection: 'bookings',
})
export class Booking {
    @Prop({
        type: Types.ObjectId,
        ref: Unit.name,
        required: true,
    })
    unit_id!: Types.ObjectId;

    @Prop({
        type: Types.ObjectId,
        ref: User.name,
        required: true,
    })
    guest_id!: Types.ObjectId;
    
    @Prop({
        type: Types.ObjectId,
        ref: User.name,
        required: true,
    })
    host_id!: Types.ObjectId;

  @Prop({ required: true })
  check_in!: Date;

  @Prop({ required: true })
  checkOut!: Date;

  @Prop({ required: true })
  days_count!: number;

  @Prop({ required: true })
  pricePerDay!: number;

  @Prop({ required: true })
  booking_amount!: number;

  @Prop({ default: 0 })
  vat!: number;

  @Prop({ default: 0 })
  vat_amount!: number;

  @Prop({ required: true })
  total_amount!: number;

  @Prop()
  adults_count!: number;

  @Prop()
  kids_count!: number;

  @Prop()
  notes!: string;

  @Prop({ type: String, enum: BookingStatus, default: BookingStatus.PENDING })
  status!: BookingStatus;

  @Prop()
  cancellation_reason!: string;

  @Prop()
  cancellationDate!: Date;

  @Prop({ type: String, enum: CancelBy })
  cancel_by!: CancelBy;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
