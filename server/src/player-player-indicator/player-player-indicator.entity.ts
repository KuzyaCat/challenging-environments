import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

import { Player } from '../player/player.entity';
import { PlayerIndicator } from '../player-indicator/player-indicator.entity';

import { TABLE_NAMES } from '../config/constants/table-names';

@Entity({ name: TABLE_NAMES.PLAYER_PLAYER_INDICATORS })
@ObjectType()
export class PlayerPlayerIndicator {
  @PrimaryColumn()
  @Field()
  id: number;

  @ManyToOne(type => Player, player => player.playerPlayerIndicators, { primary: true })
  player: Player;

  @ManyToOne(type => PlayerIndicator, playerIndicator => playerIndicator.playerPlayerIndicators, { primary: true })
  playerIndicator: PlayerIndicator;


  @Column()
  @Field()
  value: string;
}
