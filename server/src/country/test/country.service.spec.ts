import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CountryService } from '../country.service';
import { CountryModel } from '../test/support/country.model';
import { Country } from '../country.entity';
import { MockType } from '../../__mocks__/mock-type';
import { countryStub } from './stubs/country.stub';
import { regionStub } from '../../region/test/stubs/region.stub';

describe('CountryService', () => {
  let repository: Repository<Country>;
  let service: CountryService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        CountryService,
        {
          provide: getRepositoryToken(Country),
          useClass: CountryModel
        },
      ],
    }).compile();
    service = moduleRef.get<CountryService>(CountryService);
    repository = moduleRef.get<Repository<Country>>(getRepositoryToken(Country));

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have the repository mocked', () => {
    expect(typeof repository.find).toBe('function');
  });

  describe('getAll', () => {
    describe('when getAll is called', () => {
      beforeEach(async () => {
        jest.spyOn(repository, 'find');
      })

      test('then it should return countries', async () => {
        expect(await service.getAll()).toEqual([countryStub()]);
      });
    });
  });

  describe('getByRegion', () => {
    describe('when getByRegion is called', () => {
      beforeEach(async () => {
        jest.spyOn(repository, 'find');
      })

      test('then it should return countries by specific region', async () => {
        expect(await service.getByRegion({ region: countryStub().region.name })).toEqual([countryStub()]);
      });
    });
  });

  describe('get', () => {
    describe('when get is called', () => {
      beforeEach(async () => {
        jest.spyOn(repository, 'findOne');
      })

      test('then it should return country', async () => {
        expect(await service.getByRegion({ name: countryStub().name })).toEqual(countryStub());
      });
    });
  });
});


