import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';

import { Team } from './team.entity';
import { Country } from '../country/country.entity';
import { Division } from '../division/division.entity';
import { Environment } from '../environment/environment.entity';
import { GetTeamArgs } from './dto/args/get-team.args';
import { GetTeamsArgs } from './dto/args/get-teams.args';
import { CreateTeamInput } from './dto/input/create-team.input';
import { UpdateTeamInput } from './dto/input/update-team.input';
import { DeleteTeamInput } from './dto/input/delete-team.input';
import { ITeamWithJoins } from './utils/types';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team) private teamRepository: Repository<Team>,
    @InjectRepository(Country) private countryRepository: Repository<Country>,
    @InjectRepository(Division) private divisionRepository: Repository<Division>,
    @InjectRepository(Environment) private environmentRepository: Repository<Environment>,
  ) {}

  public async getAll(getTeamsArgs: GetTeamsArgs): Promise<Team[]> {
    const { environment, isNational } = getTeamsArgs;
    const environmentObj = await this.environmentRepository.findOne({
      where: { name: environment }
    });

    if (!environmentObj) {
      throw new Error('Environment not found');
    }

    return this.teamRepository.find({
      where: {
        environment: environmentObj.name,
        isNational,
        active: true
      },
      relations: ['country', 'division']
    });
  }

  public getById(getTeamArgs: GetTeamArgs): Promise<Team> {
    return this.teamRepository.findOne({ id: getTeamArgs.id });
  }

  public async create(createTeamData: CreateTeamInput): Promise<Team> {
    const country: Country = await this.countryRepository.findOne({
      where: { name: createTeamData.country },
    });

    const division: Division = await this.divisionRepository.findOne({
      where: { id: createTeamData.division },
    });

    const environment: Environment = await this.environmentRepository.findOne({
      where: { name: createTeamData.environment }
    });

    if (country && division && environment) {
      const newTeam: Team = this.teamRepository.create({
        ...createTeamData,
        country,
        division,
        environment,
      });
      return this.teamRepository.save(newTeam);
    }

    throw new Error('Country or division or environment not found');
  }

  public async update(updateTeamData: UpdateTeamInput): Promise<Team> {
    const team: Team = await this.teamRepository.findOne({
      where: {
        id: updateTeamData.id,
      }
    });

    const country: Country = await this.countryRepository.findOne({
      where: { name: updateTeamData.country },
    });

    const division: Division = await this.divisionRepository.findOne({
      where: { id: updateTeamData.division },
    });

    const environment: Environment = await this.environmentRepository.findOne({
      where: { name: updateTeamData.environment }
    });

    if (team && division && environment) {
      return this.teamRepository.save({
        ...team,
        ...updateTeamData,
        country,
        division,
        environment
      });
    }

    return null;
  }

  public async delete(deleteTeamData: DeleteTeamInput): Promise<void> {
    const team: Team = await this.teamRepository.findOne({
      where: { id: deleteTeamData.id }
    });

    if (team) {
      this.teamRepository.remove(team);
    }
  }
}

