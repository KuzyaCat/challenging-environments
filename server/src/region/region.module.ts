import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Region } from './region.entity';
import { RegionService } from './region.service';
import { RegionResolver } from './region.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Region])],
  providers: [RegionResolver, RegionService],
  exports: [],
})
export class RegionModule {}

