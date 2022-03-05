import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

import { Environment } from '../environment/environment.entity';
import { TABLE_NAMES } from '../config/constants/table-names';

@Entity({ name: TABLE_NAMES.DIVISIONS })
@ObjectType()
export class Division {
  @PrimaryColumn()
  @Field()
  id: number;

  @Column({ type: 'varchar' })
  @Field()
  @ManyToOne(type => Environment)
  @JoinColumn({ name: 'environment' })
  environment: Environment;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  tier: number;
}

