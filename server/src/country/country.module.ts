import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Country } from './country.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Country])],
  providers: [],
  exports: [],
})
export class CountryModule {}

