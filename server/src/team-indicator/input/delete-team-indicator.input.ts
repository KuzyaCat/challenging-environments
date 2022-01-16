import { InputType, Field } from '@nestjs/graphql';

import { IsNotEmpty } from 'class-validator';

import { Environment } from '../../environment/environment.entity';

@InputType()
export class DeleteTeamIndicatorInput {
  @Field()
  @IsNotEmpty()
  id: number;

  @Field()
  @IsNotEmpty()
  environment: string;
}

