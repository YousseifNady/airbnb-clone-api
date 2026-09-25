import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Currency } from './schema/currencies.schema';
import { Model } from 'mongoose';
import { CurrenciesDto } from './dtos/currencies.dto';
import { Pagination } from '../common/helpers/pagination.dto';
import { CurrencyFilter } from './filters/currencies.filter';
import { GetCurrencyDto } from './dtos/get-currency.dto';
import { UpsertCurrenciesDto } from './dtos/upsert-currency.dto';
import { BadRequestException } from '../common/exceptions/bad-request.exception';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CurrenciesService {
    constructor(
        @InjectModel(Currency.name)
        private readonly currenciesModel: Model<Currency>
    ) { }

    async getAll(data: GetCurrencyDto) {
        const filter = CurrencyFilter.build(data);

        const query = this.currenciesModel.find(filter);

        return new Pagination(
            query,
            CurrenciesDto,
            data.page,
            data.limit,
        ).get();
    }

    async store(data: UpsertCurrenciesDto): Promise<CurrenciesDto> {
        const existingCountry = await this.currenciesModel.findOne({
            name: data.name,
            country_code: data.currency_code
        });

        if (existingCountry) {
            throw new BadRequestException('Country Already Exists');
        }

        const newCountry = await this.currenciesModel.create(data);

        return plainToInstance(CurrenciesDto, newCountry);
    }

    async show(id: string): Promise<CurrenciesDto> {
        const existingCountry = await this.currenciesModel.findById(id);

        if (!existingCountry) {
            throw new BadRequestException('Country Not Found');
        }

        return plainToInstance(CurrenciesDto, existingCountry);
    }

    async update(id: string, data: UpsertCurrenciesDto): Promise<CurrenciesDto> {
        const existingCountry = await this.currenciesModel.findById(id);

        if (!existingCountry) {
            throw new BadRequestException('Country Not Found');
        }

        const country = await this.currenciesModel.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true },
        );

        return plainToInstance(CurrenciesDto, country);
    }

    async destroy(id: string): Promise<void> {
        const existingCountry = await this.currenciesModel.findById(id);

        if (!existingCountry) {
            throw new BadRequestException('Country Not Found');
        }

        await this.currenciesModel.findByIdAndUpdate(
            id,
            {
                $set: {
                    deleted_at: Date.now()
                }
            },
        );
    }
}
