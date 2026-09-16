import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginationInterface } from '../interfaces/pagination.interface';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {

    return next.handle().pipe(
      map((result) => {
        const response = result as T &
          Partial<PaginationInterface<unknown>>;

        const isPaginatedResponse = response &&
          response.data !== undefined &&
          response.meta !== undefined

        if (isPaginatedResponse) {
          return {
            success: true,
            message: 'Success',
            data: response.data,
            pagination: response.meta,
          };
        }

        return {
          success: true,
          message: 'Success',
          data: result,
        };
      }),
    );
  }
}