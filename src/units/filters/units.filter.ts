import { FilterQuery } from 'mongoose';
import { FindAllUnitsDto } from '../dtos/find-all-units.dto';
import { Unit } from '../schema/unit-categories.schema';

export class UnitsFilter {
    static build(query: FindAllUnitsDto): FilterQuery<Unit> {
        const filter: FilterQuery<Unit> = {};

        if (query.title) {
            filter.title = {
                $regex: query.title,
                $options: 'i',
            };
        }

        if (query.country_id) {
            filter.country_id = query.country_id;
        }

        if (query.city_id) {
            filter.city_id = query.city_id;
        }

        if (query.unit_category_id) {
            filter.unit_category_id = query.unit_category_id;
        }

        if (query.user_id) {
            filter.user_id = query.user_id;
        }

        if (
            query.min_cost_per_day !== undefined ||
            query.max_cost_per_day !== undefined
        ) {
            filter.cost_per_day = {};

            if (query.min_cost_per_day !== undefined) {
                filter.cost_per_day.$gte = query.min_cost_per_day;
            }

            if (query.max_cost_per_day !== undefined) {
                filter.cost_per_day.$lte = query.max_cost_per_day;
            }
        }

        if (
            query.min_rooms_count !== undefined ||
            query.max_rooms_count !== undefined
        ) {
            filter.rooms_count = {};

            if (query.min_rooms_count !== undefined) {
                filter.rooms_count.$gte = query.min_rooms_count;
            }

            if (query.max_rooms_count !== undefined) {
                filter.rooms_count.$lte = query.max_rooms_count;
            }
        }

        if (
            query.min_adults_count !== undefined ||
            query.max_adults_count !== undefined
        ) {
            filter.adults_count = {};

            if (query.min_adults_count !== undefined) {
                filter.adults_count.$gte = query.min_adults_count;
            }

            if (query.max_adults_count !== undefined) {
                filter.adults_count.$lte = query.max_adults_count;
            }
        }

        if (
            query.min_kids_count !== undefined ||
            query.max_kids_count !== undefined
        ) {
            filter.kidsCount = {};

            if (query.min_kids_count !== undefined) {
                filter.kidsCount.$gte = query.min_kids_count;
            }

            if (query.max_kids_count !== undefined) {
                filter.kidsCount.$lte = query.max_kids_count;
            }
        }

        if (query.has_internet_service !== undefined) {
            filter.has_internet_service = query.has_internet_service;
        }

        if (query.has_kitchen !== undefined) {
            filter.has_kitchen = query.has_kitchen;
        }

        if (query.has_private_garage !== undefined) {
            filter.has_private_garage = query.has_private_garage;
        }

        if (query.availability !== undefined) {
            filter.availability = query.availability;
        }

        if (query.is_active !== undefined) {
            filter.is_active = query.is_active;
        }

        return filter;
    }
}