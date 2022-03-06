import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';

import { Team } from './team.entity';
import { Country } from '../country/country.entity';
import { Division } from '../division/division.entity';
import { Environment } from '../environment/environment.entity';
import { Region } from '../region/region.entity';
import { GetTeamArgs } from './dto/args/get-team.args';
import { GetTeamsArgs } from './dto/args/get-teams.args';
import { CreateTeamInput } from './dto/input/create-team.input';
import { UpdateTeamInput } from './dto/input/update-team.input';
import { DeleteTeamInput } from './dto/input/delete-team.input';
import { NotFoundException } from '../exceptions';
import { getSortTeamsBy } from './utils';
import { SortBy, SortOrder } from '../config/types.d';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team) private teamRepository: Repository<Team>,
    @InjectRepository(Country) private countryRepository: Repository<Country>,
    @InjectRepository(Division) private divisionRepository: Repository<Division>,
    @InjectRepository(Environment) private environmentRepository: Repository<Environment>,
    @InjectRepository(Region) private regionRepository: Repository<Region>,
  ) {}

  public async getAll(getTeamsArgs: GetTeamsArgs): Promise<Team[]> {
    const { environment, isNational, limit, page, order, country, region } = getTeamsArgs;
    const environmentObj: Environment | null = await this.environmentRepository.findOne({
      where: { name: environment }
    });

    if (!environmentObj) {
      throw new NotFoundException('Environment not found');
    }

    let countryObj: Country;
    if (country) {
      countryObj = await this.countryRepository.findOne({
        where: { name: country }
      });

      if (!countryObj) {
        throw new NotFoundException('Country not found');
      }
    }

    let regionObj: Region;
    if (region) {
      const regionObj: Region | null = await this.regionRepository.findOne({
        where: { name: region }
      });

      if (!regionObj) {
        throw new NotFoundException('Region not found');
      }
    }

    const sortTeamsBy: SortBy<Team> = getSortTeamsBy(getTeamsArgs.sortBy);
    const sortOrder: SortOrder = order || 'DESC';
    const skip: number = (page - 1) * limit;

    return this.teamRepository.find({
      where: {
        environment: environmentObj.name,
        isNational,
        active: true,
        ...(countryObj && { country: countryObj }),
        ...(regionObj && { region: regionObj }),
      }, 
      relations: ['country', 'division', 'region'],
      order: {
        [sortTeamsBy]: sortOrder
      },
      skip,
      take: getTeamsArgs.limit,
    });
  }

  public getById(getTeamArgs: GetTeamArgs): Promise<Team> {
    return this.teamRepository.findOne({ id: getTeamArgs.id });
  }

  public async create(createTeamData: CreateTeamInput): Promise<Team> {
    const country: Country = await this.countryRepository.findOne({
      where: { name: createTeamData.country },
    });

    if (!country) {
      throw new NotFoundException('Country not found');
    }

    const division: Division = await this.divisionRepository.findOne({
      where: { id: createTeamData.division },
    });

    if (!division) {
      throw new NotFoundException('Division not found');
    }

    const environment: Environment = await this.environmentRepository.findOne({
      where: { name: createTeamData.environment }
    });

    if (!environment) {
      throw new NotFoundException('Environment not found');
    }

    if (country && division && environment) {
      const newTeam: Team = this.teamRepository.create({
        ...createTeamData,
        country,
        division,
        environment,
      });
      return this.teamRepository.save(newTeam);
    }
  }

  public async update(updateTeamData: UpdateTeamInput): Promise<Team> {
    const team: Team = await this.teamRepository.findOne({
      where: {
        id: updateTeamData.id,
      }
    });

    if (!team) {
      throw new NotFoundException('Team not found');
    }

    const country: Country = await this.countryRepository.findOne({
      where: { name: updateTeamData.country },
    });

    if (!country) {
      throw new NotFoundException('Country not found');
    }

    const division: Division = await this.divisionRepository.findOne({
      where: { id: updateTeamData.division },
    });

    if (!division) {
      throw new NotFoundException('Division not found');
    }

    const environment: Environment = await this.environmentRepository.findOne({
      where: { name: updateTeamData.environment }
    });

    if (!environment) {
      throw new NotFoundException('Environment not found');
    }

    return this.teamRepository.save({
      ...team,
      ...updateTeamData,
      country,
      division,
      environment
    });
  }

  public async delete(deleteTeamData: DeleteTeamInput): Promise<void> {
    const team: Team = await this.teamRepository.findOne({
      where: { id: deleteTeamData.id }
    });

    if (team) {
      await this.teamRepository.remove(team);
    }
  }
}

