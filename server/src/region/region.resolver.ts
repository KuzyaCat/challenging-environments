import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { Region } from './region.entity';
import { RegionService } from './region.service';

@Resolver(() => Region)
export class EnvironmentResolver {
  constructor(private readonly regionService: RegionService) {}

  @Query(() => [Region], { name: 'regions' })
  getRegions(): Promise<Region[]> {
    return this.regionService.getAll();
  }
}

