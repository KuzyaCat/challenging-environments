import { Entity, PrimaryColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Region {
  @PrimaryColumn()
  @Field()
  name: string;
}

