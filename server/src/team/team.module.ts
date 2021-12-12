import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Team } from './team.entity';
import { TeamService } from './team.service';
import { TeamResolver } from './team.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Team])],
  providers: [TeamService, TeamResolver],
  exports: [],
})
export class TeamModule {}

