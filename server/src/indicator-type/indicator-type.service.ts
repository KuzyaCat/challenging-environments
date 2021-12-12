import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';

import { IndicatorType } from './indidator-type.entity';
import { GetIndicatorTypeArgs } from './dto/get-indicator-type.args';

@Injectable()
export class IndicatorTypeService {
  constructor(@InjectRepository(IndicatorType) private indicatorTypeRepository: Repository<IndicatorType>) {}

  public get(getIndicatorTypeArgs: GetIndicatorTypeArgs): Promise<IndicatorType> {
    return this.indicatorTypeRepository.findOne(getIndicatorTypeArgs);
  }

  public getAll(): Promise<IndicatorType[]> {
    return this.indicatorTypeRepository.find();
  }
}

