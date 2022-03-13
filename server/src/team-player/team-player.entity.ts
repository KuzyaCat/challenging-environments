import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

import { Player } from '../player/player.entity';
import { Team } from '../team/team.entity';
import { TABLE_NAMES } from '../config/constants/table-names';
import { PLAYER_POSITION } from '../config/constants';

@Entity({ name: TABLE_NAMES.TEAMS_PLAYERS })
@ObjectType()
export class TeamPlayer {
  @PrimaryColumn()
  @Field()
  id: number;

  @ManyToOne(type => Player, player => player.teamPlayers, { primary: true })
  player: Player;

  @ManyToOne(type => Team, team => team.teamPlayers, { primary: true })
  team: Team;

  @Column({ type: 'varchar' })
  @Field()
  position: PLAYER_POSITION;

  @CreateDateColumn({ type: 'timestamp' })
  @Field()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Field()
  updatedAt: Date;
}
