import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { PlayerIndicator } from './player-indicator.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlayerIndicator])],
  providers: [],
  exports: [],
})
export class PlayerIndicatorModule {}

