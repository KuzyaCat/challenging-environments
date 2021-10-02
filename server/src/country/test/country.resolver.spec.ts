import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CountryService } from '../country.service';
import { CountryModel } from '../test/support/country.model';
import { Country } from '../country.entity';
import { MockType } from '../../__mocks__/mock-type';
import { countryStub } from './stubs/country.stub';
import { regionStub } from '../../region/test/stubs/region.stub';
import { CountryResolver } from '../country.resolver';

describe('RegionResolver', () => {
  let resolver: CountryResolver;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        CountryResolver,
        CountryService,
        {
          provide: getRepositoryToken(Country),
          useClass: CountryModel
        },
        {
          provide: CountryResolver,
          useFactory: () => ({
            getRegions: jest.fn(() => ([regionStub()])),
          }),
        },
      ],
    }).compile();

    resolver = moduleRef.get<CountryResolver>(CountryResolver);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('getCountries', () => {
    describe('when getCountries is called', () => {
      test('then it should return countries', async () => {
        expect(resolver.getCountries()).toEqual([countryStub()]);
      });
    });
  });

  describe('getCountriesByRegion', () => {
    describe('when getCountries is called', () => {
      test('then it should return sepcific by region countries', async () => {
        expect(resolver.getCountriesByRegion({ region: countryStub().region.name })).toEqual([countryStub()]);
      });
    });
  });

  describe('getCountry', () => {
    describe('when getCountry is called', () => {
      test('then it should return specific country', async () => {
        expect(resolver.getCountry({ name: countryStub().name })).toEqual(countryStub());
      });
    });
  });
});



