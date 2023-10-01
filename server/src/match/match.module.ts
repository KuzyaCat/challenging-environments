import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Environment } from '../environment/environment.entity';
import { Team } from '../team/team.entity';
import { Match } from './match.entity';
import { Player } from '../player/player.entity';
import { MatchScore } from './match-scores.entity';
import { Tournament } from '../tournament/tournament.entity';

import { MatchService } from './match.service';
import { MatchResolver } from './match.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Match, Team, Environment, Player, MatchScore, Tournament])],
  providers: [MatchService, MatchResolver],
  exports: [],
})
export class MatchModule {}
