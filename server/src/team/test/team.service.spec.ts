import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TeamService } from '../team.service';
import { TeamModel } from '../test/support/team.model';
import { Team } from '../team.entity';
import { MockType } from '../../__mocks__/mock-type';
import { teamStub } from './stubs/team.stub';
import { countryStub } from '../../country/test/stubs/country.stub';
import { Country } from '../../country/country.entity';
import { CountryModel } from '../../country/test/support/country.model';

describe('TeamService', () => {
  let repository: Repository<Team>;
  let countryRepository: Repository<Country>;
  let service: TeamService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        TeamService,
        {
          provide: getRepositoryToken(Team),
          useClass: TeamModel
        },
        {
          provide: getRepositoryToken(Country),
          useClass: CountryModel
        },
      ],
    }).compile();
    service = moduleRef.get<TeamService>(TeamService);
    repository = moduleRef.get<Repository<Team>>(getRepositoryToken(Team));
    countryRepository = moduleRef.get<Repository<Country>>(getRepositoryToken(Country));

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

      test('then it should return teams', async () => {
        expect(await service.getAll()).toEqual([teamStub()]);
      });
    });
  });

  describe('get', () => {
    describe('when get is called', () => {
      beforeEach(async () => {
        jest.spyOn(repository, 'findOne');
      })

      test('then it should return a team by id', async () => {
        expect(await service.getById({ id: teamStub().id })).toEqual(teamStub());
      });
    });
  });

  describe('create', () => {
    describe('when create is called', () => {
      let team: Team;

      beforeEach(async () => {
        jest.spyOn(countryRepository, 'findOne');
        jest.spyOn(repository, 'create');
        team = await repository.create(teamStub());
      })

      test('then it should call the teamModel', async () => {
        expect(repository.create).toHaveBeenCalledWith(teamStub());
      });

      test('then it should return a team', async () => {
        expect(await service.create({
          name: teamStub().name,
          country: countryStub().name,
          logo: teamStub().logo,
        })).toEqual(team);
      });
    });
  });

  describe('update', () => {
    describe('when create is called', () => {
      let team: Team;

      beforeEach(async () => {
        jest.spyOn(countryRepository, 'findOne');
        jest.spyOn(repository, 'save');
        team = await repository.save(teamStub());
      })

      test('then it should call the teamModel', async () => {
        expect(repository.save).toHaveBeenCalledWith(teamStub());
      });

      test('then it should return a team', async () => {
        expect(await service.update({
          id: teamStub().id,
          name: teamStub().name,
          country: countryStub().name,
          logo: teamStub().logo,
          matches: teamStub().matches,
          wins: teamStub().wins,
          draws: teamStub().draws,
          loses: teamStub().loses,
          evaluation: teamStub().evaluation,
        })).toEqual(team);
      });
    });
  });

  describe('delete', () => {
    describe('when create is called', () => {
      let team: Team;

      beforeEach(async () => {
        jest.spyOn(repository, 'remove');
        await repository.delete({ id: teamStub().id });
      })

      test('then it should call the teamModel', async () => {
        expect(repository.remove).toHaveBeenCalledWith({ id: teamStub().id });
      });
    });
  });
});

