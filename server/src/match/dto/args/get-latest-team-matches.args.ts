import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class GetLatestTeamMatchesArgs {
  @Field()
  teamId: number;

  @Field()
  count: number;
}
