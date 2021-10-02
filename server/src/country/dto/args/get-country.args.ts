import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class GetCountryArgs {
  @Field()
  name: string;

  @Field()
  region: string;
}

