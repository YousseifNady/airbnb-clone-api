import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Currency } from './schema/currencies.schema';
import { Model } from 'mongoose';
import { CurrenciesDto } from './dtos/currencies.dto';
import { Pagination } from '../common/helpers/pagination.helper';
import { CurrencyFilter } from './filters/currencies.filter';
import { FindAllCurrenciesDto } from './dtos/find-all-currencies.dto';
import { UpsertCurrenciesDto } from './dtos/upsert-currencies.dto';
import { BadRequestException } from '../common/exceptions/bad-request.exception';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CurrenciesService {
  constructor(
    @InjectModel(Currency.name)
    private readonly currenciesModel: Model<Currency>,
  ) {}

  async findAll(data: FindAllCurrenciesDto) {
    const filter = CurrencyFilter.build(data);

    const query = this.currenciesModel.find(filter);

    return new Pagination(query, CurrenciesDto, data.page, data.limit).get();
  }

  async store(data: UpsertCurrenciesDto): Promise<CurrenciesDto> {
    const existingCurrency = await this.currenciesModel.findOne({
      name: data.name,
      currency_code: data.currency_code,
    });

    if (existingCurrency) {
      throw new BadRequestException('Currency Already Exists');
    }

    const newCurrency = await this.currenciesModel.create(data);

    return plainToInstance(CurrenciesDto, newCurrency);
  }

  async show(id: string): Promise<CurrenciesDto> {
    const existingCurrency = await this.currenciesModel.findById(id);

    if (!existingCurrency) {
      throw new BadRequestException('Currency Not Found');
    }

    return plainToInstance(CurrenciesDto, existingCurrency);
  }

  async update(id: string, data: UpsertCurrenciesDto): Promise<CurrenciesDto> {
    const existingCurrency = await this.currenciesModel.findById(id);

    if (!existingCurrency) {
      throw new BadRequestException('Currency Not Found');
    }

    const currency = await this.currenciesModel.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true },
    );

    return plainToInstance(CurrenciesDto, currency);
  }

  async destroy(id: string): Promise<void> {
    const existingCurrency = await this.currenciesModel.findById(id);

    if (!existingCurrency) {
      throw new BadRequestException('Currency Not Found');
    }

    await this.currenciesModel.findByIdAndUpdate(id, {
      $set: {
        deleted_at: Date.now(),
      },
    });
  }
}
