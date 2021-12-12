import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { TeamIndicator } from './team-indicator.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TeamIndicator])],
  providers: [],
  exports: [],
})
export class TeamIndicatorModule {}

