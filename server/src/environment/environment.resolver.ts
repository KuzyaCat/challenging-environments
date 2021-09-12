import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { GetEnvironmentArgs } from './dto/args/get-environment.args';
import { CreateEnvironmentInput } from './dto/input/create-environment.input';
import { DeleteEnvironmentInput } from './dto/input/delete-environment.input';
import { UpdateEnvironmentInput } from './dto/input/update-environment.input';

import { Environment } from './environment.entity';
import { EnvironmentService } from './environment.service';

@Resolver(() => Environment)
export class EnvironmentResolver {
  constructor(private readonly environmentService: EnvironmentService) {}

  @Query(() => Environment, { name: 'environment', nullable: true })
  getEnvironment(@Args() getEnvironmentArgs: GetEnvironmentArgs): Promise<Environment> {
    return this.environmentService.get(getEnvironmentArgs);
  }

  @Query(() => [Environment], { name: 'environments' })
  getEnvironments(): Promise<Environment[]> {
    return this.environmentService.getAll();
  }

  @Mutation(() => Environment)
  createEnvironment(
    @Args('createEnvironmentData') createEnvironmentData: CreateEnvironmentInput
  ): Promise<Environment> {
    return this.environmentService.create(createEnvironmentData);
  }

  @Mutation(() => Environment)
  updateEnvironment(
    @Args('updateEnvironmentData') updateEnvironmentData: UpdateEnvironmentInput
  ): Promise<Environment> {
    return this.environmentService.update(updateEnvironmentData);
  }

  @Mutation(() => Environment)
  deleteEnvironment(
    @Args('deleteEnvironmentData') deleteEnvironmentData: DeleteEnvironmentInput
  ): Promise<Environment> {
    return this.environmentService.delete(deleteEnvironmentData);
  }
}
