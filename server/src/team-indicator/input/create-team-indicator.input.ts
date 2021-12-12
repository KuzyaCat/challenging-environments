import { InputType, Field } from '@nestjs/graphql';

import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateTeamIndicatorInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  environment: string;

  @Field()
  @IsNotEmpty()
  type: string;

  @Field()
  isPrimary: boolean = false;
}

