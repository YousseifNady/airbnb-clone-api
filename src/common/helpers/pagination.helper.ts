import { plainToInstance } from 'class-transformer';
import { Query } from 'mongoose';
import { PaginationInterface } from '../interfaces/pagination.interface';

export class Pagination<T> {
  constructor(
    private query: Query<any[], any>,
    private dto: new () => T,
    private page: number,
    private limit: number,
  ) {}

  async get(): Promise<PaginationInterface<T>> {
    const [data, total] = await Promise.all([
      this.query
        .clone()
        .skip((this.page - 1) * this.limit)
        .limit(this.limit)
        .exec(),

      this.query.model.countDocuments(this.query.getFilter()),
    ]);

    return {
      data: plainToInstance(this.dto, data),
      meta: {
        currentPage: this.page,
        perPage: this.limit,
        total,
        totalPages: Math.ceil(total / this.limit),
      },
    };
  }
}
