import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UnitsService } from './units.service';
import { FindAllUnitsDto } from './dtos/find-all-units.dto';
import { UpsertUnitsDto } from './dtos/upsert-units.dto';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { UnitsDto } from './dtos/units.dto';

@Controller('units')
export class UnitsController {
    constructor(
        private readonly unitsService: UnitsService
    ) {}

    @Get('/')
    async findAll(
        @Query() data: FindAllUnitsDto
    ) {
        return await this.unitsService.findAll(data);
    }

    @Post('/')
    async store(
        @Body() data: UpsertUnitsDto
    ): Promise<UnitsDto> {
        return await this.unitsService.store(data);
    }

    @Get('/:id')
    async show(
        @Param('id', ParseObjectIdPipe) id: string 
    ): Promise<UnitsDto> {
        return await this.unitsService.show(id);
    }

    @Put('/:id')
    update(
        @Param('id', ParseObjectIdPipe) id: string,
        @Body() data: UpsertUnitsDto
    ): Promise<UnitsDto> {
        return this.unitsService.update(id, data);
    }

    @Delete('/:id')
    async destroy(
        @Param('id', ParseObjectIdPipe) id: string 
    ): Promise<void> {
        return await this.unitsService.destroy(id);
    }
}
