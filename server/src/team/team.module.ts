import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Team } from './team.entity';
import { TeamService } from './team.service';
import { TeamResolver } from './team.resolver';
import { Country } from '../country/country.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Team]), TypeOrmModule.forFeature([Country])],
  providers: [TeamService, TeamResolver],
  exports: [],
})
export class TeamModule {}

