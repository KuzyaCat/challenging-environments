import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Tournament } from './tournament.entity';
import { TournamentService } from './tournament.service';
import { TournamentResolver } from './tournament.resolver';
import { Environment } from '../environment/environment.entity';
import { Team } from '../team/team.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tournament, Environment, Team])],
  providers: [TournamentService, TournamentResolver],
  exports: [TournamentService],
})
export class TournamentModule {}
