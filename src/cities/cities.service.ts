import { BadRequestException, Injectable } from '@nestjs/common';
import { City } from './schema/cities.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pagination } from '../common/helpers/pagination.dto';
import { CitiesDto } from './dtos/cities.dto';
import { GetCityDto } from './dtos/get-city.dto';
import { plainToInstance } from 'class-transformer';
import { UpdateOrStoreCityDto } from './dtos/update-or-store-city.dto';
import { CityFilter } from './filters/cities.filter';

@Injectable()
export class CitiesService {

    constructor(
        @InjectModel(City.name)
        private readonly citiesModel: Model<City>
    ) { }

    async getAll(data: GetCityDto) {
        const filter = CityFilter.build(data);

        const query = this.citiesModel.find(filter).populate('country');

        return new Pagination(
            query,
            CitiesDto,
            data.page,
            data.limit,
        ).get();
    }

    async store(data: UpdateOrStoreCityDto): Promise<CitiesDto> {
        const existingCountry = await this.citiesModel.findOne({
            name: data.name,
            country_id: data.country_id
        });

        if (existingCountry) {
            throw new BadRequestException('City Already Exists');
        }

        const newCity = await this.citiesModel.create(data);

        return plainToInstance(CitiesDto, newCity);
    }

    async show(id: string): Promise<CitiesDto> {
        const existingCountry = await this.citiesModel.findById(id).populate('country');

        if (!existingCountry) {
            throw new BadRequestException('City Not Found');
        }

        return plainToInstance(CitiesDto, existingCountry);
    }

    async update(id: string, data: UpdateOrStoreCityDto): Promise<CitiesDto> {
        const existingCountry = await this.citiesModel.findById(id);

        if (!existingCountry) {
            throw new BadRequestException('City Not Found');
        }

        const City = await this.citiesModel.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true },
        );

        return plainToInstance(CitiesDto, City);
    }

    async destroy(id: string): Promise<void> {
        const existingCountry = await this.citiesModel.findById(id);

        if (!existingCountry) {
            throw new BadRequestException('City Not Found');
        }

        await this.citiesModel.findByIdAndUpdate(
            id,
            {
                $set: {
                    deleted_at: Date.now()
                }
            },
        );
    }
}
