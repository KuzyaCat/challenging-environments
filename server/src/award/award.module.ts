import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Award } from './award.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Award])],
  providers: [],
  exports: [],
})
export class AwardModule {}
