import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Region } from './region.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Region])],
  providers: [],
  exports: [],
})
export class RegionModule {}

