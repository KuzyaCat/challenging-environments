import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Division } from './division.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Division])],
  providers: [],
  exports: [],
})
export class DivisionModule {}
