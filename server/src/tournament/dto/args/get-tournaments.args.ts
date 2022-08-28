import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

import { SortOrder } from '../../../config/types.d';

@ArgsType()
export class GetTournamentsArgs {
  @IsNotEmpty()
  @Field()
  environment: string;

  @Field()
  showFinished: boolean = false;

  @Field()
  page?: number = 1;

  @Field()
  limit?: number = 30;
}
