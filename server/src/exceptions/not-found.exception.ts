import { HttpException, HttpStatus } from '@nestjs/common';

import { EXCEPTION_TYPE } from './types';

export class NotFoundException extends HttpException {
  type: EXCEPTION_TYPE;

  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
    this.type = EXCEPTION_TYPE.NOT_FOUND;
  }
};
