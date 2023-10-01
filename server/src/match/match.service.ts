import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, Any, In, Not, FindOperator } from 'typeorm';

import { Match } from './match.entity';
import { Environment } from '../environment/environment.entity';
import { Team } from '../team/team.entity';

import { GetLatestTeamMatchesArgs } from './dto/args/get-latest-team-matches.args';
import { CreateRandomMatchInput } from './dto/input/create-random-match.input';

import { NotFoundException } from '../exceptions/not-found.exception';

import { getRandomInt } from '../utils';

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

  public async createRandomMatch(createRandomMatchInput: CreateRandomMatchInput): Promise<Match> {
    const { environmentId, teamId, regionId } = createRandomMatchInput;
    let query: { [key: string]: number | string | FindOperator<number> } = { environmentId };
    let limit = 2;

    if (regionId) {
      query = {
        ...query,
        regionId,
      };
    }

    if (teamId) {
      limit = 1;
      query = {
        ...query,
        id: Not(teamId)
      };
    }

    // TODO: investigate how to randomly sort with TypeORM
    const teams = await this.teamRepository.find({ where: query, select: ['id'] });
    let [index1, index2] = [getRandomInt(teams.length), getRandomInt(teams.length)];

    let team1Id: number | null = null;
    let team2Id: number | null = null;
    if (teamId) {
      team1Id = teamId;
      team2Id = teams[index1].id;
    } else {
      team1Id = teams[index1].id;
      if (index1 === index2) {
        index2 = index1 > 0 ? index1 - 1 : index1 + 1;
      }
      team2Id = teams[index2].id;
    }

    const newMatch = this.matchRepository.create({
      environmentId,
      team1Id,
      team2Id,
    });
    const created = await this.matchRepository.save(newMatch)

    return this.matchRepository.findOne({
      where: {
        id: created.id
      },
      relations: ['team1', 'team2'],
    });
  }
}
