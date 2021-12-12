import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Country } from './country.entity';
import { CountryService } from './country.service';
import { CountryResolver } from './country.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Country])],
  providers: [CountryService, CountryResolver],
  exports: [],
})
export class CountryModule {}

