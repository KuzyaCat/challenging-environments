import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { IndicatorType } from './indidator-type.entity';
import { IndicatorTypeService } from './indicator-type.service';
import { GetIndicatorTypeArgs } from './dto/get-indicator-type.args';

@Resolver(() => IndicatorType)
export class IndicatorTypeResolver {
  constructor(private readonly indicatorTypeService: IndicatorTypeService) {}

  @Query(() => IndicatorType, { name: 'indicatorType', nullable: true })
  getIndicatorType(@Args() getIndicatorTypeArgs: GetIndicatorTypeArgs): Promise<IndicatorType> {
    return this.indicatorTypeService.get(getIndicatorTypeArgs);
  }

  @Query(() => [IndicatorType], { name: 'indicatorTypes' })
  getIndicatorTypes(): Promise<IndicatorType[]> {
    return this.indicatorTypeService.getAll();
  }
}

