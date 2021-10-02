import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';

import { Team } from './team.entity';
import { Country } from '../country/country.entity';
import { GetTeamArgs } from './dto/args/get-team.args';
import { CreateTeamInput } from './dto/input/create-team.input';
import { UpdateTeamInput } from './dto/input/update-team.input';
import { DeleteTeamInput } from './dto/input/delete-team.input';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team) private teamRepository: Repository<Team>,
    @InjectRepository(Country) private countryRepository: Repository<Country>
  ) {}

  public getAll(): Promise<Team[]> {
    return this.teamRepository.find();
  }

  public get(getTeamArgs: GetTeamArgs): Promise<Team> {
    return this.teamRepository.findOne(getTeamArgs);
  }

  public async create(createTeamData: CreateTeamInput): Promise<Team> {
    const country: Country = await this.countryRepository.findOne({
      where: { name: createTeamData.country },
    });

    if (country) {
      const newTeam: Team = this.teamRepository.create({ ...createTeamData, country });
      return this.teamRepository.save(newTeam);
    }

    throw new Error('Country not found');
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

    if (team) {
      return this.teamRepository.save({
        ...team,
        ...updateTeamData,
        country,
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

