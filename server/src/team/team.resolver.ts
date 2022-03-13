import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { Team } from './team.entity';
import { TeamService } from './team.service';

import { GetTeamArgs } from './dto/args/get-team.args';
import { GetTeamsArgs } from './dto/args/get-teams.args';
import { CreateTeamInput } from './dto/input/create-team.input';
import { UpdateTeamInput } from './dto/input/update-team.input';
import { DeleteTeamInput } from './dto/input/delete-team.input';
import { ITeamDetails } from './utils/types';

@Resolver(() => Team)
export class TeamResolver {
  constructor(private readonly teamService: TeamService) {}

  @Query(() => Team, { name: 'team', nullable: true })
  getTeam(@Args() getTeamArgs: GetTeamArgs): Promise<Team> {
    return this.teamService.getById(getTeamArgs);
  }

  @Query(() => Team, { name: 'teamDetails', nullable: true })
  getTeamDetails(@Args() getTeamArgs: GetTeamArgs): Promise<ITeamDetails> {
    return this.teamService.getTeamDetails(getTeamArgs);
  }

  @Query(() => [Team], { name: 'teams' })
  getTeams(@Args() getTeamsArgs: GetTeamsArgs): Promise<Team[]> {
    return this.teamService.getAll(getTeamsArgs);
  }

  @Mutation(() => Team)
  createTeam(
    @Args('createTeamData') createTeamData: CreateTeamInput
  ): Promise<Team> {
    return this.teamService.create(createTeamData);
  }

  @Mutation(() => Team)
  updateTeam(
    @Args('updateTeamData') updateTeamData: UpdateTeamInput
  ): Promise<Team> {
    return this.teamService.update(updateTeamData);
  }

  @Mutation(() => Team)
  async deleteTeam(
    @Args('deleteTeamData') deleteTeamData: DeleteTeamInput
  ): Promise<{ message: string; deleted?: boolean }> {
    try {
      await this.teamService.delete(deleteTeamData);
      return { message: 'Team was removed', deleted: true };
    } catch (error) {
      return { message: error.message, deleted: false };
    }
  }
}

