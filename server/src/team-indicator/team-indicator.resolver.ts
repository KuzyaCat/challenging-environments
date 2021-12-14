import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { TeamIndicator } from './team-indicator.entity';
import { TeamIndicatorService } from './team-indicator.service';
import { GetTeamIndicatorArgs } from './dto/get-team-indicator.args';
import { GetTeamIndicatorsArgs } from './dto/get-team-indicators.args';
import { CreateTeamIndicatorInput } from './input/create-team-indicator.input';
import { UpdateTeamIndicatorInput } from './input/update-team-indicator.input';
import { DeleteTeamIndicatorInput } from './input/delete-team-indicator.input';

@Resolver(() => TeamIndicator)
export class TeamIndicatorResolver {
  constructor(private readonly teamIndicatorService: TeamIndicatorService) {}

  @Query(() => TeamIndicator, { name: 'teamIndicator', nullable: true })
  getTeamIndicator(@Args() getTeamIndicatorArgs: GetTeamIndicatorArgs): Promise<TeamIndicator> {
    return this.teamIndicatorService.get(getTeamIndicatorArgs);
  }

  @Query(() => [TeamIndicator], { name: 'teamIndicators' })
  getTeamIndicators(@Args() getTeamIndicatorsArgs: GetTeamIndicatorsArgs): Promise<TeamIndicator[]> {
    return this.teamIndicatorService.getAll(getTeamIndicatorsArgs);
  }

  @Mutation(() => TeamIndicator)
  createTeamIndicator(
    @Args('createTeamIndicatorData') createTeamIndicatorData: CreateTeamIndicatorInput
  ): Promise<TeamIndicator> {
    return this.teamIndicatorService.create(createTeamIndicatorData);
  }

  @Mutation(() => TeamIndicator)
  updateTeamIndicator(
    @Args('updateTeamInducatorData') updateTeamInducatorData: UpdateTeamIndicatorInput
  ): Promise<TeamIndicator> {
    return this.teamIndicatorService.update(updateTeamInducatorData);
  }

  @Mutation(() => TeamIndicator)
  async deleteTeamIndicator(
    @Args('deleteTeamIndicatorData') deleteTeamIndicatorData: DeleteTeamIndicatorInput
  ): Promise<{ message: string; success: boolean }> {
    try {
      await this.teamIndicatorService.delete(deleteTeamIndicatorData);
      return { message: 'Team indicator was removed', success: true };
    } catch (error) {
      return { message: error.message, success: false };
    }
  }
}

