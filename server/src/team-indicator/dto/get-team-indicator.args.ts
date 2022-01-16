import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

import { Environment } from '../../environment/environment.entity';

@ArgsType()
export class GetTeamIndicatorArgs {
  @Field()
  @IsNotEmpty()
  id?: number;

  @Field()
  @IsNotEmpty()
  environment?: string;
}

