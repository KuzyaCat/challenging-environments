import { InputType, Field } from '@nestjs/graphql';

import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateTeamIndicatorInput {
  @Field()
  @IsNotEmpty()
  id: number;

  @Field()
  @IsNotEmpty()
  environment: string;

  @Field()
  @IsNotEmpty()
  type: string;

  @Field()
  name: string;

  @Field()
  isPrimary: boolean = false;
}

