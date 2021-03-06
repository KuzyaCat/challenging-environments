import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

import { IndicatorType } from '../indicator-type/indidator-type.entity';
import { Environment } from '../environment/environment.entity';
import { PlayerPlayerIndicator } from '../player-player-indicator/player-player-indicator.entity';

import { TABLE_NAMES } from '../config/constants/table-names';

@Entity({ name: TABLE_NAMES.PLAYER_INDICATORS })
@ObjectType()
export class PlayerIndicator {
  @PrimaryColumn()
  @Field()
  id: number;

  //@Column({ type: 'varchar' })
  //@Field()
  //@ManyToOne(type => IndicatorType, type => type.name)
  //type: IndicatorType;

  @Column()
  @Field()
  type: string;

  @Column({ type: 'varchar' })
  @Field()
  @ManyToOne(type => Environment)
  @JoinColumn({ name: 'environment' })
  environment: Environment;

  @Column()
  @Field()
  name: string;

  @Column('boolean', { default: false })
  @Field()
  isPrimary: boolean = false;

  @Field()
  value: string;

  @OneToMany(type => PlayerPlayerIndicator, playerPlayerIndicator => playerPlayerIndicator.id)
  playerPlayerIndicators: PlayerPlayerIndicator[];
}
