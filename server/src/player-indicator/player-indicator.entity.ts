import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

import { IndicatorType } from '../indicator-type/indidator-type.entity';
import { Environment } from '../environment/environment.entity';
import { TABLE_NAMES } from '../config/constants/table-names';

@Entity({ name: TABLE_NAMES.PLAYER_INDICATORS })
@ObjectType()
export class PlayerIndicator {
  @PrimaryColumn()
  @Field()
  id: number;

  @Column({ type: 'varchar' })
  @Field()
  @ManyToOne(type => IndicatorType, type => type.name)
  type: IndicatorType;

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
  isPrimary: boolean = false;
}

