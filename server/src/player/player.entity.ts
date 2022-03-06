import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

import { Country } from '../country/country.entity';
import { Environment } from '../environment/environment.entity';
import { TABLE_NAMES } from '../config/constants/table-names';
import { PlayerRole } from './utils/types';

@Entity({ name: TABLE_NAMES.PLAYERS })
@ObjectType()
export class Player {
  @PrimaryColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  firstname?: string;

  @Column()
  @Field()
  lastname: string;

  @Column()
  @Field()
  age: number;

  @Column()
  @Field()
  matches: number;

  @Column()
  @Field()
  points_earned: number = 0;

  @Column()
  @Field()
  assists_earned: number = 0;

  @Column()
  @Field()
  evaluation: number;

  @Column()
  @Field()
  photo?: string;

  @Column()
  @Field()
  role?: PlayerRole;

  @Column()
  @Field()
  active: boolean = true;

  @Column({ type: 'varchar' })
  @Field()
  @ManyToOne(type => Country)
  @JoinColumn({ name: 'country' })
  country: Country;

  @Column({ type: 'varchar' })
  @Field()
  @ManyToOne(type => Environment)
  @JoinColumn({ name: 'environment' })
  environment: Environment;
}

