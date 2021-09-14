import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RegionResolver } from '../region.resolver';
import { RegionService } from '../__mocks__/region.service';
import { RegionModel } from '../test/support/region.model';
import { Region } from '../region.entity';
import { MockType } from '../../__mocks__/mock-type';
import { regionStub } from './stubs/region.stub';

describe('RegionResolver', () => {
  let resolver: RegionResolver;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        RegionResolver,
        RegionService,
        {
          provide: getRepositoryToken(Region),
          useClass: RegionModel
        },
        {
          provide: RegionResolver,
          useFactory: () => ({
            getRegions: jest.fn(() => ([regionStub()])),
          }),
        },
      ],
    }).compile();

    resolver = moduleRef.get<RegionResolver>(RegionResolver);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('getRegions', () => {
    describe('when getRegions is called', () => {
      test('then it should return regions', async () => {
        expect(resolver.getRegions()).toEqual([regionStub()]);
      });
    });
  });
});


