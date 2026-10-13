import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Unit } from '../../units/schema/unit.schema';
import { AppSetting } from '../../app-settings/schema/app-settings.schema';

@Injectable()
export class BookingPricingService {
  constructor(
    @InjectModel(AppSetting.name)
    private readonly appSettingModel: Model<AppSetting>,
  ) {}

  async calculate(
    unit: Unit,
    checkIn: string | Date,
    checkOut: string | Date,
  ) {
    const daysCount = this.calcDays(checkIn, checkOut);
    const pricePerDay = unit.cost_per_day;
    const bookingAmount = daysCount * pricePerDay;

    const { vatRate, calculatedVatAmount } =
      await this.calcVatAmount(bookingAmount);

    const totalAmount = bookingAmount + calculatedVatAmount;

    return {
      pricePerDay,
      daysCount,
      vatRate,
      bookingAmount,
      calculatedVatAmount,
      totalAmount,
    };
  }

  private calcDays(checkIn: string | Date, checkOut: string | Date) {
    const start = new Date(checkIn);
    const end = new Date(checkOut);

    return Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
    );
  }

  private async calcVatAmount(bookingAmount: number) {
    const appSettings = await this.appSettingModel.findOne().lean();

    const vatRate = appSettings?.vat_rate ?? 0;
    const calculatedVatAmount = bookingAmount * (vatRate / 100);

    return {
      vatRate,
      calculatedVatAmount,
    };
  }
}