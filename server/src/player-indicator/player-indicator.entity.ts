import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

import { IndicatorType } from '../indicator-type/indidator-type.entity';
import { Environment } from '../environment/environment.entity';

@Entity()
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
  @ManyToOne(type => Environment, type => type.name)
  environment: Environment;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  isPrimary: boolean = false;
}

