import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateRandomMatchInput {
  @Field()
  @IsNotEmpty()
  environmentId: string;

  @Field({ nullable: true })
  teamId?: number;

  @Field({ nullable: true })
  regionId?: string;
}
