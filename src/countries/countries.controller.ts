import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { StoreCountryDto } from './dtos/store-country.dto';
import { GetCountryDto } from './dtos/get-country.dto';

@Controller('countries')
export class CountriesController {
    constructor(
        private readonly countriesService: CountriesService
    ) { }

    @Get('/')
    index(@Query() queryParams: GetCountryDto) {
        return this.countriesService.getAll(queryParams);
    }

    @Post('/')
    store(@Body() data: StoreCountryDto) {
        return this.countriesService.store(data);
    }

    @Get('/:id')
    show(@Param() id: string) {
        return this.countriesService.show(id);
    }

    @Put('/:id')
    update(@Param() id: string, @Body() data: StoreCountryDto) {
        return this.countriesService.update(id, data);
    }

    @Delete('/:id')
    destroy(@Param() id: string) {
        return this.countriesService.destroy(id);
    }
}
