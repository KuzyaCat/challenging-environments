import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { GetTournamentArgs } from './dto/args/get-tournament.args';
import { GetTournamentsArgs } from './dto/args/get-tournaments.args';
import { CreateTournamentInput } from './dto/input/create-tournament.input';
import { FinishTournamentInput } from './dto/input/finish-tournament.input';

import { Tournament } from './tournament.entity';
import { TournamentService } from './tournament.service';

@Resolver(() => Tournament)
export class TournamentResolver {
  constructor(private readonly tournamentService: TournamentService) {}

  @Query(() => Tournament, { name: 'tournament', nullable: true })
  getTournament(@Args() getTournamentArgs: GetTournamentArgs): Promise<Tournament> {
    return this.tournamentService.get(getTournamentArgs);
  }

  @Query(() => [Tournament], { name: 'tournaments' })
  getTournaments(@Args() getTournamentsArgs: GetTournamentsArgs): Promise<Tournament[]> {
    return this.tournamentService.getAll(getTournamentsArgs);
  }

  @Mutation(() => Tournament)
  createTournament(
    @Args('createTournamentInput') createTournamentInput: CreateTournamentInput
  ): Promise<Tournament> {
    return this.tournamentService.create(createTournamentInput);
  }

  @Mutation(() => Tournament)
  finishTournament(
    @Args('finishTournamentInput') finishTournamentInput: FinishTournamentInput
  ): Promise<Tournament> {
    return this.tournamentService.finish(finishTournamentInput);
  }
}
