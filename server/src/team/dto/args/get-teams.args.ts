import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class GetTeamsArgs {
  @IsNotEmpty()
  @Field()
  environment: string;

  @Field()
  isNational: boolean;
}
