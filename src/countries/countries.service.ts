import { Injectable } from '@nestjs/common';
import { Country } from './schema/countries.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { CountriesDto } from './dtos/countries.dto';
import { BadRequestException } from '../common/exceptions/bad-request.exception';
import { StoreCountryDto } from './dtos/store-country.dto';

@Injectable()
export class CountriesService {
    constructor(
        @InjectModel(Country.name)
        private readonly countriesModel: Model<Country>
    ) { }

    async getAll(): Promise<CountriesDto[]> {
        const countries = await this.countriesModel.find();
        return plainToInstance(CountriesDto, countries);
    }

    async store(data: StoreCountryDto): Promise<CountriesDto> {
        const existingCountry = await this.countriesModel.findOne({
            name: data.name,
            country_code: data.country_code
        });

        if (existingCountry) {
            throw new BadRequestException('Country Already Exists');
        }

        const newCountry = await this.countriesModel.create(data);

        return plainToInstance(CountriesDto, newCountry);
    }

    async show(id: string): Promise<CountriesDto> {
        const existingCountry = await this.countriesModel.findById(id);

        if (!existingCountry) {
            throw new BadRequestException('Country Not Found');
        }

        return plainToInstance(CountriesDto, existingCountry);
    }

    async update(id: string, data: StoreCountryDto): Promise<CountriesDto> {
        const existingCountry = await this.countriesModel.findById(id);

        if (!existingCountry) {
            throw new BadRequestException('Country Not Found');
        }

        const country = await this.countriesModel.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true },
        );

        return plainToInstance(CountriesDto, country);
    }

    async destroy(id: string): Promise<void> {
        const existingCountry = await this.countriesModel.findById(id);

        if (!existingCountry) {
            throw new BadRequestException('Country Not Found');
        }

        await this.countriesModel.deleteOne({ id });
    }
}
