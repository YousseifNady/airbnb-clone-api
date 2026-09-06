import { BaseCustomException } from './base.exception';

export class BadRequestException extends BaseCustomException {
  status = 400;

  constructor(message: string) {
    super(message);
  }
}
