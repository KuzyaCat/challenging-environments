import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EnvironmentService } from '../environment.service';
import { EnvironmentModel } from '../test/support/environment.model';
import { Environment } from '../environment.entity';
import { MockType } from '../../__mocks__/mock-type';
import { environmentStub } from './stubs/environment.stub';

describe('EnvironmentService', () => {
  let repository: Repository<Environment>;
  let service: EnvironmentService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        EnvironmentService,
        {
          provide: getRepositoryToken(Environment),
          useClass: EnvironmentModel
        },
      ],
    }).compile();
    service = moduleRef.get<EnvironmentService>(EnvironmentService);
    repository = moduleRef.get<Repository<Environment>>(getRepositoryToken(Environment));

    repository.create = jest.fn().mockImplementation(() => {
      return environmentStub();
    });

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have the repository mocked', () => {
    expect(typeof repository.find).toBe('function');
  });

  describe('findOne', () => {
    describe('when findOne is called', () => {
      let environment: Environment;
      const filterQuery = { name: environmentStub().name };

      beforeEach(async () => {
        jest.spyOn(repository, 'findOne');
        environment = await repository.findOne(filterQuery);
      })

      test('then it should call the environmentModel', async () => {
        expect(repository.findOne).toHaveBeenCalledWith(filterQuery);
      });

      test('then it should return an environment', async () => {
        expect(await service.get(filterQuery)).toEqual(environment);
      });
    });
  });

  describe('find', () => {
    describe('when find is called', () => {
      beforeEach(async () => {
        jest.spyOn(repository, 'find');
      })

      test('then it should return environments', async () => {
        expect(await service.getAll()).toEqual([environmentStub()]);
      });
    });
  });

  describe('create', () => {
    describe('when create is called', () => {
      let environment: Environment;

      beforeEach(async () => {
        jest.spyOn(repository, 'create');
        environment = await repository.create(environmentStub());
      })

      test('then it should call the environmentModel', async () => {
        expect(repository.create).toHaveBeenCalledWith(environmentStub());
      });

      test('then it should return an environment', async () => {
        expect(await service.create(environmentStub())).toEqual(environment);
      });
    });
  });

  describe('update', () => {
    describe('when create is called', () => {
      let environment: Environment;
      const updateQuery = { name: environmentStub().name, newName: 'Test' };

      beforeEach(async () => {
        jest.spyOn(repository, 'save');
        environment = await repository.save({ name: updateQuery.newName });
      })

      test('then it should call the environmentModel', async () => {
        expect(repository.save).toHaveBeenCalledWith({ name: updateQuery.newName });
      });

      test('then it should return an environment', async () => {
        expect(await service.update(updateQuery)).toEqual(environment);
      });
    });
  });

  describe('delete', () => {
    describe('when create is called', () => {
      let environment: Environment;
      const filterQuery = { name: environmentStub().name };

      beforeEach(async () => {
        jest.spyOn(repository, 'save');
        environment = await repository.save({ deleted: true });
      })

      test('then it should call the environmentModel', async () => {
        expect(repository.save).toHaveBeenCalledWith({ deleted: true });
      });

      test('then it should return an environment', async () => {
        expect(await service.delete(filterQuery)).toEqual(environment);
      });
    });
  });
});
