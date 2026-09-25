import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { UpdateOrStoreCityDto } from './dtos/update-or-store-city.dto';
import { GetCityDto } from './dtos/get-city.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Roles } from '../common/enums/role.enum';
import { Role } from '../auth/decorators/role.decorator';

@Controller('cities')
@UseGuards(AuthGuard)
@Role(Roles.SYSTEM_ADMIN)
export class CitiesController {
    constructor(
        private readonly citiesService: CitiesService
    ) { }

    @Get('/')
    index(@Query() queryParams: GetCityDto) {
        return this.citiesService.getAll(queryParams);
    }

    @Post('/')
    store(@Body() data: UpdateOrStoreCityDto) {
        return this.citiesService.store(data);
    }

    @Get('/:id')
    show(@Param() id: string) {
        return this.citiesService.show(id);
    }

    @Put('/:id')
    update(@Param() id: string, @Body() data: UpdateOrStoreCityDto) {
        return this.citiesService.update(id, data);
    }

    @Delete('/:id')
    destroy(@Param() id: string) {
        return this.citiesService.destroy(id);
    }
}
