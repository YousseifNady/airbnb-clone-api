import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { UpsertCurrenciesDto } from './dtos/upsert-currency.dto';
import { GetCurrencyDto } from './dtos/get-currency.dto';

@Controller('currencies')
export class CurrenciesController {
    constructor(
        private readonly currenciesService: CurrenciesService
    ) { }

    @Get('/')
    index(@Query() queryParams: GetCurrencyDto) {
        return this.currenciesService.getAll(queryParams);
    }

    @Post('/')
    store(@Body() data: UpsertCurrenciesDto) {
        return this.currenciesService.store(data);
    }

    @Get('/:id')
    show(@Param() id: string) {
        return this.currenciesService.show(id);
    }

    @Put('/:id')
    update(@Param() id: string, @Body() data: UpsertCurrenciesDto) {
        return this.currenciesService.update(id, data);
    }

    @Delete('/:id')
    destroy(@Param() id: string) {
        return this.currenciesService.destroy(id);
    }
}
