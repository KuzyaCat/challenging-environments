import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, CreateDateColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

import { Environment } from '../environment/environment.entity';
import { Team } from '../team/team.entity';
import { Match } from './match.entity';
import { Player } from '../player/player.entity';

import { TABLE_NAMES } from '../config/constants/table-names';

@Entity({ name: TABLE_NAMES.MATCHE_SCORES })
@ObjectType()
export class MatchScore {
  @PrimaryGeneratedColumn('increment')
  @Field()
  id: number;

  @Field()
  @ManyToOne(type => Environment)
  @JoinColumn({ name: 'environmentId' })
  environment: Environment;

  @Column({ type: 'varchar' })
  environmentId: string;

  @Field(() => Team)
  @ManyToOne(type => Team)
  @JoinColumn({ name: 'teamId' })
  team: Team;

  @Column({ type: 'int' })
  teamId: number;

  @Field(() => Match)
  @ManyToOne(type => Match)
  @JoinColumn({ name: 'matchId' })
  match: Match;

  @Column({ type: 'int' })
  matchId: number;

  @Field(() => Player)
  @ManyToOne(type => Player)
  @JoinColumn({ name: 'playerId' })
  player: Player;

  @Column({ type: 'int' })
  playerId: number;

  @Column({ type: 'int' })
  points: number = 0;

  @Column({ type: 'int' })
  assists: number = 0;

  @CreateDateColumn({ type: 'timestamp' })
  @Field()
  createdAt: Date;
}
