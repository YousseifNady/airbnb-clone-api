import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { UpsertCountryDto } from './dtos/upsert-country.dto';
import { GetCountryDto } from './dtos/get-country.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Roles } from '../common/enums/role.enum';
import { Role } from '../auth/decorators/role.decorator';
import { Public } from '../auth/decorators/public.decorator';

@Controller('countries')
@UseGuards(AuthGuard)
@Role(Roles.SYSTEM_ADMIN)
export class CountriesController {
    constructor(
        private readonly countriesService: CountriesService
    ) { }

    @Get('/')
    @Public()
    index(@Query() queryParams: GetCountryDto) {
        return this.countriesService.getAll(queryParams);
    }

    @Post('/')
    store(@Body() data: UpsertCountryDto) {
        return this.countriesService.store(data);
    }

    @Get('/:id')
    show(@Param() id: string) {
        return this.countriesService.show(id);
    }

    @Put('/:id')
    update(@Param() id: string, @Body() data: UpsertCountryDto) {
        return this.countriesService.update(id, data);
    }

    @Delete('/:id')
    destroy(@Param() id: string) {
        return this.countriesService.destroy(id);
    }
}
