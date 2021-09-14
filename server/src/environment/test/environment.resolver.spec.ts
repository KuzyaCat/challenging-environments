import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EnvironmentResolver } from '../environment.resolver';
import { EnvironmentService } from '../__mocks__/environment.service';
import { EnvironmentModel } from '../test/support/environment.model';
import { Environment } from '../environment.entity';
import { MockType } from '../../__mocks__/mock-type';
import { environmentStub } from './stubs/environment.stub';
import { GetEnvironmentArgs } from '../dto/args/get-environment.args';
import { CreateEnvironmentInput } from '../dto/input/create-environment.input';
import { UpdateEnvironmentInput } from '../dto/input/update-environment.input';
import { DeleteEnvironmentInput } from '../dto/input/delete-environment.input';

describe('EnvironmentResolver', () => {
  let resolver: EnvironmentResolver;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        EnvironmentResolver,
        EnvironmentService,
        {
          provide: getRepositoryToken(Environment),
          useClass: EnvironmentModel
        },
        {
          provide: EnvironmentResolver,
          useFactory: () => ({
            getEnvironment: jest.fn((getEnvironmentArgs: GetEnvironmentArgs) => environmentStub()),
            getEnvironments: jest.fn(() => ([environmentStub()])),
            createEnvironment: jest.fn((createEnvironmentData: CreateEnvironmentInput) => (environmentStub())),
            updateEnvironment: jest.fn((updateEnvironmentData: UpdateEnvironmentInput) => ({ ...environmentStub(), name: updateEnvironmentData.newName })),
            deleteEnvironment: jest.fn((deleteEnvironmentData: DeleteEnvironmentInput) => ({ ...environmentStub(), deleted: true })),
          }),
        },
      ],
    }).compile();

    resolver = moduleRef.get<EnvironmentResolver>(EnvironmentResolver);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  const getEnvironmentArgs = { name: 'FF' };
  const createEnvironmentData = { name: 'FF' };
  const updateEnvironmentData = { name: 'FF', newName: 'RFF' };
  const deleteEnvironmentData = { name: 'FF' };

  describe('getEnvironment', () => {
    describe('when getEnvironment is called', () => {
      test('then it should return an environment', async () => {
        expect(resolver.getEnvironment(getEnvironmentArgs)).toEqual(environmentStub());
      });
    });
  });

  describe('getEnvironments', () => {
    describe('when getEnvironments is called', () => {
      test('then it should return an environment', async () => {
        expect(resolver.getEnvironments()).toEqual([environmentStub()]);
      });
    });
  });

  describe('createEnvironment', () => {
    describe('when createEnvironment is called', () => {
      test('then it should create an environment', async () => {
        expect(resolver.createEnvironment(createEnvironmentData)).toEqual(environmentStub());
      });
    });
  });

  describe('updateEnvironment', () => {
    describe('when updateEnvironment is called', () => {
      test('then it should update an environment', async () => {
        expect(resolver.updateEnvironment(updateEnvironmentData)).toEqual({ ...environmentStub(), name: updateEnvironmentData.newName });
      });
    });
  });

  describe('deleteEnvironment', () => {
    describe('when deleteEnvironment is called', () => {
      test('then it should soft delete an environment', async () => {
        expect(resolver.deleteEnvironment(deleteEnvironmentData)).toEqual({ ...environmentStub(), deleted: true });
      });
    });
  });
});

