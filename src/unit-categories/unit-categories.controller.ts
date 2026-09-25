import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UnitCategoriesService } from './unit-categories.service';
import { Public } from '../auth/decorators/public.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Roles } from '../common/enums/role.enum';
import { Role } from '../auth/decorators/role.decorator';
import { GetUnitCategoryDto } from './dtos/get-unit-category.dto';
import { UpsertUnitCategoryDto } from './dtos/upsert-unit-category.dto';

@Controller('unit-categories')
@UseGuards(AuthGuard)
@Role(Roles.SYSTEM_ADMIN)
export class UnitCategoriesController {
    constructor(
        private readonly unitCategoriesService: UnitCategoriesService
    ) { }

    @Get('/')
    @Public()
    index(@Query() queryParams: GetUnitCategoryDto) {
        return this.unitCategoriesService.getAll(queryParams);
    }

    @Post('/')
    store(@Body() data: UpsertUnitCategoryDto) {
        return this.unitCategoriesService.store(data);
    }

    @Get('/:id')
    show(@Param() id: string) {
        return this.unitCategoriesService.show(id);
    }

    @Put('/:id')
    update(@Param() id: string, @Body() data: UpsertUnitCategoryDto) {
        return this.unitCategoriesService.update(id, data);
    }

    @Delete('/:id')
    destroy(@Param() id: string) {
        return this.unitCategoriesService.destroy(id);
    }
}
