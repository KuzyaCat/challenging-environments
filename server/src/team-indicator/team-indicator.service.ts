import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';

import { TeamIndicator } from './team-indicator.entity';
import { Environment } from '../environment/environment.entity';
import { IndicatorType } from '../indicator-type/indidator-type.entity';
import { GetTeamIndicatorArgs } from './dto/get-team-indicator.args';
import { GetTeamIndicatorsArgs } from './dto/get-team-indicators.args';
import { CreateTeamIndicatorInput } from './input/create-team-indicator.input';
import { UpdateTeamIndicatorInput } from './input/update-team-indicator.input';
import { DeleteTeamIndicatorInput } from './input/delete-team-indicator.input';

@Injectable()
export class TeamIndicatorService {
  constructor(
    @InjectRepository(TeamIndicator) private teamIndicatorRepository: Repository<TeamIndicator>,
    @InjectRepository(Environment) private environmentRepository: Repository<Environment>,
    @InjectRepository(IndicatorType) private indicatorTypeRepository: Repository<IndicatorType>
  ) {}

  public async create(createTeamIndicatorInput: CreateTeamIndicatorInput): Promise<TeamIndicator> {
    const environment: Environment = await this.environmentRepository.findOne({
      where: { name: createTeamIndicatorInput.environment },
    });

    const type: IndicatorType = await this.environmentRepository.findOne({
      where: { name: createTeamIndicatorInput.type },
    });

    if (environment && type) {
      const newTeamIndicator = this.teamIndicatorRepository.create({ ...createTeamIndicatorInput, environment, type });
      return this.teamIndicatorRepository.save(newTeamIndicator);
    }

    if (!environment) {
      throw new Error('Environment not found');
    }

    if (!type) {
      throw new Error('Indicator type not found');
    }

    throw new Error('Failed to create team indicator');
  }

  public async update(updateTeamIndicatorInput: UpdateTeamIndicatorInput): Promise<TeamIndicator> {
    const teamIndicator = await this.teamIndicatorRepository.findOne({
      where: { id: updateTeamIndicatorInput.id, environment: updateTeamIndicatorInput.environment }
    });

    if (teamIndicator) {
      return this.teamIndicatorRepository.save({
        ...teamIndicator,
        name: updateTeamIndicatorInput.name,
        isPrimary: updateTeamIndicatorInput.isPrimary
      });
    }

    return null;
  }

  public get(teamIndicatorArgs: GetTeamIndicatorArgs): Promise<TeamIndicator> {
    return this.teamIndicatorRepository.findOne({ where: teamIndicatorArgs });
  }

  public getAll(getTeamIndicatorsArgs: GetTeamIndicatorsArgs): Promise<TeamIndicator[]> {
    return this.teamIndicatorRepository.find({ where: getTeamIndicatorsArgs });
  }

  public async delete(deleteTeamIndicatorInput: DeleteTeamIndicatorInput): Promise<TeamIndicator> {
    await this.teamIndicatorRepository.delete(deleteTeamIndicatorInput.id);

    return null;
  }
}

