import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Team } from '../team/team.entity';
import { Player } from '../player/player.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Team, Player])],
  providers: [],
  exports: [],
})
export class TeamPlayerModule {}
