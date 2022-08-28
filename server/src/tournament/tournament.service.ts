import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';

import { GetTournamentsArgs } from './dto/args/get-tournaments.args';
import { GetTournamentArgs } from './dto/args/get-tournament.args';
import { CreateTournamentInput } from './dto/input/create-tournament.input';
import { FinishTournamentInput } from './dto/input/finish-tournament.input';

import { NotFoundException } from '../exceptions';

import { Tournament } from './tournament.entity';
import { Environment } from '../environment/environment.entity';
import { Team } from '../team/team.entity';

@Injectable()
export class TournamentService {
  constructor(
    @InjectRepository(Tournament) private tournamentRepository: Repository<Tournament>,
    @InjectRepository(Environment) private environmentRepository: Repository<Environment>,
    @InjectRepository(Team) private teamRepository: Repository<Team>,
  ) {}

  public async create(createTournamentInput: CreateTournamentInput): Promise<Tournament> {
    const environment = await this.environmentRepository.findOne({
      where: { name: createTournamentInput.environment }
    });

    if (!environment) {
      throw new NotFoundException('Environment not found');
    }

    const newTournament = this.tournamentRepository.create({
      name: createTournamentInput.name,
      tier: createTournamentInput.tier,
      environmentId: environment.name,
    });
    return this.tournamentRepository.save(newTournament);
  }

  public async finish(finishTournamentInput: FinishTournamentInput): Promise<Tournament> {
    const tournament = await this.tournamentRepository.findOne({
      where: {
        id: finishTournamentInput.id,
        deleted: false
      }
    });

    if (!tournament) {
      throw new NotFoundException('Tournament not found');
    }

    const winner = await this.teamRepository.findOne({
      where: { id: finishTournamentInput.winnerId }
    });

    if (!winner) {
      throw new NotFoundException('Team not found');
    }

    return this.tournamentRepository.save({
      ...tournament,
      winnerId: winner.id,
      isFinished: true,
    });
  }

  public get(getTournamentArgs: GetTournamentArgs): Promise<Tournament> {
    return this.tournamentRepository.findOne({
      where: getTournamentArgs,
      relations: ['winner'],
    });
  }

  public async getAll(getTournamentsArgs: GetTournamentsArgs): Promise<Tournament[]> {
    const { page, limit, showFinished, environment } = getTournamentsArgs;

    const environmentObj: Environment | null = await this.environmentRepository.findOne({
      where: { name: environment, deleted: false }
    });

    if (!environmentObj) {
      throw new NotFoundException('Environment not found');
    }

    const skip: number = (page - 1) * limit;

    return this.tournamentRepository.find({
      where: {
        deleted: false,
        environmentId: environmentObj.name,
        ...(showFinished ? {} : { isFinished: false }),
      },
      relations: ['environment'],
      skip,
      take: limit,
      order: {
        tier: 'ASC',
        createdAt: 'DESC',
      }
    });
  }
}
