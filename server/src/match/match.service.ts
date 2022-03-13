import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, Any, In } from 'typeorm';

import { Match } from './match.entity';
import { Environment } from '../environment/environment.entity';
import { Team } from '../team/team.entity';

import { GetLatestTeamMatchesArgs } from './dto/args/get-latest-team-matches.args';

import { NotFoundException } from '../exceptions/not-found.exception';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match) private matchRepository: Repository<Match>,
    @InjectRepository(Team) private teamRepository: Repository<Team>,
    @InjectRepository(Environment) private environmentRepository: Repository<Environment>,
  ) {}

  public async getLatestTeamMatches(getLatestTeamMatchesArgs: GetLatestTeamMatchesArgs): Promise<Match[]> {
    const { teamId, count } = getLatestTeamMatchesArgs;
    const team: Team | null = await this.teamRepository.findOne({ id: teamId });
    if (!team) {
      throw new NotFoundException('Team not found');
    }

    const DEFAULT_TAKE = 5;

    return this.matchRepository.find({
      where: [
        {
          is_finished: true,
          team1: teamId,
        },
        {
          is_finished: true,
          team2: teamId,
        },
      ],
      relations: ['winner', 'team1', 'team2'],
      order: { finishedAt: 'DESC' },
      take: count || DEFAULT_TAKE,
    });
  }
}
