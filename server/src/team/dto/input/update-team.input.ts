import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateTeamInput {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  country: string;

  @Field()
  active: boolean;

  @Field()
  logo: string;

  @Field()
  matches: number;

  @Field()
  wins: number;

  @Field()
  draws: number;

  @Field()
  loses: number;

  @Field()
  points_earned: number;

  @Field()
  enemy_points_earned: number;

  @Field()
  points_difference: number;
}

