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
import { PlayerAward } from '../player-award/player-award.entity';
import { PlayerPlayerIndicator } from '../player-player-indicator/player-player-indicator.entity';
import { Match } from '../match/match.entity';

import { MatchService } from '../match/match.service';

@Module({
  imports: [TypeOrmModule.forFeature([
    Team,
    Country,
    Division,
    Environment,
    Region,
    TeamPlayer,
    PlayerAward,
    PlayerPlayerIndicator,
    Match,
  ])],
  providers: [TeamService, TeamResolver, MatchService],
  exports: [],
})
export class TeamModule {}

