import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RegionService } from '../region.service';
import { RegionModel } from '../test/support/region.model';
import { Region} from '../region.entity';
import { MockType } from '../../__mocks__/mock-type';
import { regionStub } from './stubs/region.stub';

describe('RegionService', () => {
  let repository: Repository<Region>;
  let service: RegionService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        RegionService,
        {
          provide: getRepositoryToken(Region),
          useClass: RegionModel
        },
      ],
    }).compile();
    service = moduleRef.get<RegionService>(RegionService);
    repository = moduleRef.get<Repository<Region>>(getRepositoryToken(Region));

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have the repository mocked', () => {
    expect(typeof repository.find).toBe('function');
  });

  describe('find', () => {
    describe('when find is called', () => {
      beforeEach(async () => {
        jest.spyOn(repository, 'find');
      })

      test('then it should return regions', async () => {
        expect(await service.getAll()).toEqual([regionStub()]);
      });
    });
  });
});

