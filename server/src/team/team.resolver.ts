import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { Team } from './team.entity';
import { TeamService } from './team.service';
import { GetTeamArgs } from './dto/args/get-team.args';
import { CreateTeamInput } from './dto/input/create-team.input';
import { UpdateTeamInput } from './dto/input/update-team.input';
import { DeleteTeamInput } from './dto/input/delete-team.input';

@Resolver(() => Team)
export class TeamResolver {
  constructor(private readonly teamService: TeamService) {}

  @Query(() => Team, { name: 'team', nullable: true })
  getTeam(@Args() getTeamArgs: GetTeamArgs): Promise<Team> {
    return this.teamService.getById(getTeamArgs);
  }

  @Query(() => [Team], { name: 'environments' })
  getEnvironments(): Promise<Team[]> {
    return this.teamService.getAll();
  }

  @Mutation(() => Team)
  createEnvironment(
    @Args('createTeamData') createTeamData: CreateTeamInput
  ): Promise<Team> {
    return this.teamService.create(createTeamData);
  }

  @Mutation(() => Team)
  updateEnvironment(
    @Args('updateTeamData') updateTeamData: UpdateTeamInput
  ): Promise<Team> {
    return this.teamService.update(updateTeamData);
  }

  @Mutation(() => Team)
  async deleteEnvironment(
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

