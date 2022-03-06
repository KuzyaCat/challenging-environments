import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

import { SortOrder } from '../../../config/types.d';
import { PlayerRole } from '../../utils/types';

@ArgsType()
export class GetPlayersArgs {
  @IsNotEmpty()
  @Field()
  environment: string;

  @Field()
  country?: string | null = null;

  @Field()
  sortBy?: string = 'evaluation';

  @Field()
  role?: PlayerRole | null = null;

  @Field()
  order?: SortOrder = 'DESC';

  @Field()
  page?: number = 1;

  @Field()
  limit?: number = 30;
}
