import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

import { SortOrder } from '../../../config/types.d';

@ArgsType()
export class GetTeamsArgs {
  @IsNotEmpty()
  @Field()
  environment: string;

  @IsNotEmpty()
  @Field()
  isNational: boolean;

  @Field()
  country?: string | null = null;

  @Field()
  region?: string | null = null;

  @Field()
  sortBy?: string = 'evaluation';

  @Field()
  order?: SortOrder = 'DESC';

  @Field()
  page?: number = 1;

  @Field()
  limit?: number = 30;
}
