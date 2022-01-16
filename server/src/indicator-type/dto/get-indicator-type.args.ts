import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class GetIndicatorTypeArgs {
  @Field()
  @IsNotEmpty()
  name: string;
}

