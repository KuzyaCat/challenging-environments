import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

import { Player } from '../player/player.entity';
import { Award } from '../award/award.entity';

import { TABLE_NAMES } from '../config/constants/table-names';
import { PLAYER_POSITION } from '../config/constants';

@Entity({ name: TABLE_NAMES.PLAYERS_AWARDS })
@ObjectType()
export class PlayerAward {
  @PrimaryColumn()
  @Field()
  id: number;

  @ManyToOne(type => Player, player => player.playerAwards, { primary: true })
  player: Player;

  @ManyToOne(type => Award, award => award.playerAwards, { primary: true })
  award: Award;

  @CreateDateColumn({ type: 'timestamp' })
  @Field()
  createdAt: Date;
}
