import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

import { Environment } from '../../environment/environment.entity';

@ArgsType()
export class GetTeamIndicatorsArgs {
  @Field()
  @IsNotEmpty()
  environment?: string;
}

