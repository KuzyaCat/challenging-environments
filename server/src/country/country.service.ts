import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Country } from './country.entity';
import { GetCountryArgs } from './dto/args/get-country.args';

@Injectable()
export class CountryService {
  constructor(@InjectRepository(Country) private countryRepository: Repository<Country>) {}

  public getAll(): Promise<Country[]> {
    return this.countryRepository.find();
  }

  public get(getCountryArgs: GetCountryArgs): Promise<Country> {
    return this.countryRepository.findOne({
      where: { name: getCountryArgs.name },
    });
  }

  public getByRegion(getCountryArgs: GetCountryArgs): Promise<Country> {
    return this.countryRepository.findOne({
      where: { region: getCountryArgs.region },
    });
  }
}

