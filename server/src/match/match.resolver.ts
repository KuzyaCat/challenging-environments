import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { GetLatestTeamMatchesArgs } from './dto/args/get-latest-team-matches.args';
import { CreateRandomMatchInput } from './dto/input/create-random-match.input';

import { MatchService } from './match.service';

import { Match } from './match.entity';

@Resolver(() => Match)
export class MatchResolver {
  constructor(private readonly matchService: MatchService) {}

  @Mutation(() => Match)
  createRandomMatch(
    @Args('createRandomMatchInput') createRandomMatchInput: CreateRandomMatchInput
  ): Promise<Match> {
    return this.matchService.createRandomMatch(createRandomMatchInput);
  }
}
