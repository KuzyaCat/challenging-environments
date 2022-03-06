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
  sortBy?: string;

  @Field()
  order?: SortOrder;

  @Field()
  page?: number = 1;

  @Field()
  limit?: number = 30;
}
