import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { IndicatorType } from './indidator-type.entity';
import { IndicatorTypeService } from './indicator-type.service';
import { IndicatorTypeResolver } from './indicator-type.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([IndicatorType])],
  providers: [IndicatorTypeResolver, IndicatorTypeService],
  exports: [IndicatorTypeService],
})
export class IndicatorTypeModule {}

