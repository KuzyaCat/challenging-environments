import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { Country } from './country.entity';
import { CountryService } from './country.service';
import { GetCountryArgs } from './dto/args/get-country.args';

@Resolver(() => Country)
export class CountryResolver {
  constructor(private readonly countryService: CountryService) {}

  @Query(() => [Country], { name: 'countries' })
  getCountries(): Promise<Country[]> {
    return this.countryService.getAll();
  }

  @Query(() => [Country], { name: 'countries' })
  getCountriesByRegion(@Args() getCountryArgs: GetCountryArgs): Promise<Country[]> {
    return this.countryService.getByRegion({ region: getCountryArgs.name });
  }

  @Query(() => [Country], { name: 'country' })
  getCountry(@Args() getCountryArgs: GetCountryArgs): Promise<Country> {
    return this.countryService.get(getCountryArgs);
  }
}

