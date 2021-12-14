import { Entity, PrimaryColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

@Entity({ name: 'indicator_types' })
@ObjectType()
export class IndicatorType {
  @PrimaryColumn()
  @Field()
  name: string;
}

