import { BadRequestException, Injectable } from '@nestjs/common';
import { City } from './schema/cities.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pagination } from '../common/helpers/pagination.helper';
import { CitiesDto } from './dtos/cities.dto';
import { FindAllCitiesDto } from './dtos/find-all-cities.dto';
import { plainToInstance } from 'class-transformer';
import { UpsertCitiesDto } from './dtos/upsert-cities.dto';
import { CityFilter } from './filters/cities.filter';
import { CountriesService } from '../countries/countries.service';

@Injectable()
export class CitiesService {
  constructor(
    @InjectModel(City.name)
    private readonly citiesModel: Model<City>,
    private readonly countriesService: CountriesService,
  ) {}

  async findAll(data: FindAllCitiesDto) {
    const filter = CityFilter.build(data);

    const query = this.citiesModel.find(filter).populate('country');

    return new Pagination(query, CitiesDto, data.page, data.limit).get();
  }

  async store(data: UpsertCitiesDto): Promise<CitiesDto> {
    await this.countriesService.show(data.country_id); // Validates country exists

    const existingCity = await this.citiesModel.findOne({
      name: data.name,
      country_id: data.country_id,
    });

    if (existingCity) {
      throw new BadRequestException('City Already Exists');
    }

    const newCity = await this.citiesModel.create(data);

    return plainToInstance(CitiesDto, newCity);
  }

  async show(id: string): Promise<CitiesDto> {
    const existingCity = await this.citiesModel
      .findById(id)
      .populate('country');

    if (!existingCity) {
      throw new BadRequestException('City Not Found');
    }

    return plainToInstance(CitiesDto, existingCity);
  }

  async update(id: string, data: UpsertCitiesDto): Promise<CitiesDto> {
    const existingCity = await this.citiesModel.findById(id);

    if (!existingCity) {
      throw new BadRequestException('City Not Found');
    }

    if (data.country_id && data.country_id !== existingCity.country_id.toString()) {
      await this.countriesService.show(data.country_id);
    }

    const duplicateCity = await this.citiesModel.findOne({
      _id: { $ne: id },
      name: data.name,
      country_id: data.country_id || existingCity.country_id,
    });

    if (duplicateCity) {
      throw new BadRequestException('City Name Already Exists in this Country');
    }

    const updatedCity = await this.citiesModel.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true },
    );

    return plainToInstance(CitiesDto, updatedCity);
  }

  async destroy(id: string): Promise<void> {
    const existingCity = await this.citiesModel.findById(id);

    if (!existingCity) {
      throw new BadRequestException('City Not Found');
    }

    await this.citiesModel.findByIdAndUpdate(id, {
      $set: {
        deleted_at: Date.now(),
      },
    });
  }
}
