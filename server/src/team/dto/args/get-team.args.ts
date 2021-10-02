import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class GetTeamArgs {
  @Field()
  @IsNotEmpty()
  id: number;
}

