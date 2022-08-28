import { InputType, Field } from '@nestjs/graphql';

import { IsNotEmpty } from 'class-validator';

@InputType()
export class FinishTournamentInput {
  @Field()
  @IsNotEmpty()
  id: number;

  @Field()
  @IsNotEmpty()
  winnerId: number;
}
