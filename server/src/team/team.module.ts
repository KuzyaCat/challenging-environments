import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Team } from './team.entity';
import { TeamService } from './team.service';
import { TeamResolver } from './team.resolver';
import { Country } from '../country/country.entity';
import { Division } from '../division/division.entity';
import { Environment } from '../environment/environment.entity';
import { Region } from '../region/region.entity';
import { TeamPlayer } from '../team-player/team-player.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Team, Country, Division, Environment, Region, TeamPlayer])],
  providers: [TeamService, TeamResolver],
  exports: [],
})
export class TeamModule {}

