import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Player } from './player.entity';
import { Environment } from '../environment/environment.entity';
import { Country } from '../country/country.entity';
import { PlayerService } from './player.service';
import { PlayerResolver } from './player.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Player, Environment, Country])],
  providers: [PlayerService, PlayerResolver],
  exports: [],
})
export class PlayerModule {}
