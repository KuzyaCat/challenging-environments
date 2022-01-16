import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';

import { TeamIndicator } from './team-indicator.entity';
import { GetTeamIndicatorArgs } from './dto/get-team-indicator.args';
import { GetTeamIndicatorsArgs } from './dto/get-team-indicators.args';
import { CreateTeamIndicatorInput } from './input/create-team-indicator.input';
import { UpdateTeamIndicatorInput } from './input/update-team-indicator.input';
import { DeleteTeamIndicatorInput } from './input/delete-team-indicator.input';

@Injectable()
export class TeamIndicatorService {
  constructor(@InjectRepository(TeamIndicator) private teamIndicatorRepository: Repository<TeamIndicator>) {}

  public create(createTeamIndicatorInput: CreateTeamIndicatorInput): Promise<TeamIndicator> {
    const newTeamIndicator = this.teamIndicatorRepository.create(createTeamIndicatorInput);
    return this.teamIndicatorRepository.save(newTeamIndicator);
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
    return this.teamIndicatorRepository.findOne(teamIndicatorArgs);
  }

  public getAll(getTeamIndicatorsArgs: GetTeamIndicatorsArgs): Promise<TeamIndicator[]> {
    return this.teamIndicatorRepository.find(getTeamIndicatorsArgs);
  }

  public async delete(deleteTeamIndicatorInput: DeleteTeamIndicatorInput): Promise<TeamIndicator> {
    await this.teamIndicatorRepository.delete(deleteTeamIndicatorInput);

    return null;
  }
}

