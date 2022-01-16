import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Environment } from '../environment/environment.entity';
import { TeamIndicator } from './team-indicator.entity';
import { IndicatorType } from '../indicator-type/indidator-type.entity';
import { TeamIndicatorService } from './team-indicator.service';
import { TeamIndicatorResolver } from './team-indicator.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([TeamIndicator]),
    TypeOrmModule.forFeature([Environment]),
    TypeOrmModule.forFeature([IndicatorType])
  ],
  providers: [TeamIndicatorService, TeamIndicatorResolver],
  exports: [],
})
export class TeamIndicatorModule {}

