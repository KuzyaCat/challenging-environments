import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class DeleteTeamInput {
  @Field()
  @IsNotEmpty()
  id: number;
}

