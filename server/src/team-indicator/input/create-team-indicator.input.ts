import { InputType, Field } from '@nestjs/graphql';

import { IsNotEmpty } from 'class-validator';
import { Environment } from '../../environment/environment.entity';
import { IndicatorType } from '../../indicator-type/indidator-type.entity';

@InputType()
export class CreateTeamIndicatorInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  environment: Environment;

  @Field()
  @IsNotEmpty()
  type: IndicatorType;

  @Field()
  isPrimary: boolean = false;
}

