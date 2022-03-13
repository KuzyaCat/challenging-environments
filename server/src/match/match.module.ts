import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Environment } from '../environment/environment.entity';
import { Team } from '../team/team.entity';
import { Match } from './match.entity';
import { MatchService } from './match.service';

@Module({
  imports: [TypeOrmModule.forFeature([Match, Team, Environment])],
  providers: [MatchService],
  exports: [],
})
export class MatchModule {}
