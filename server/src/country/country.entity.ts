import { Entity, Column, PrimaryColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Country {
  @PrimaryColumn()
  @Field()
  name: string;

  @Column()
  @Field()
  icon: string;
}

