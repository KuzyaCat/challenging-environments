import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

import { Country } from '../country/country.entity';

@Entity()
@ObjectType()
export class Team {
  @PrimaryColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  logo: string;

  @Column({ type: 'varchar' })
  @Field()
  @ManyToOne(type => Country, country => country.name)
  country: Country;

  @Column()
  @Field()
  active?: boolean = true;

  @Column()
  @Field()
  evaluation?: number = 0;

  @Column()
  @Field()
  matches?: number = 0;

  @Column()
  @Field()
  wins?: number = 0;

  @Column()
  @Field()
  draws?: number = 0;

  @Column()
  @Field()
  loses?: number = 0;

  @Column()
  @Field()
  points_earned?: number = 0;

  @Column()
  @Field()
  enemy_points_earned?: number = 0;

  @Column()
  @Field()
  points_difference?: number = 0;
}

