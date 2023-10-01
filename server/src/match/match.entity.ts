import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, CreateDateColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

import { Environment } from '../environment/environment.entity';
import { Team } from '../team/team.entity';
import { Tournament } from '../tournament/tournament.entity';

import { TABLE_NAMES } from '../config/constants/table-names';

@Entity({ name: TABLE_NAMES.MATCHES })
@ObjectType()
export class Match {
  @PrimaryGeneratedColumn('increment')
  @Field()
  id: number;

  @Field()
  @ManyToOne(type => Environment)
  @JoinColumn({ name: 'environment' })
  environment: Environment;

  @Column({ type: 'varchar' })
  environmentId: string;

  @Field(() => Team)
  @ManyToOne(type => Team)
  @JoinColumn({ name: 'team1Id' })
  team1?: Team;

  @Column({ type: 'int' })
  team1Id?: number;

  @Field(() => Team)
  @ManyToOne(type => Team)
  @JoinColumn({ name: 'team2Id' })
  team2?: Team;

  @Column({ type: 'int' })
  team2Id?: number;

  @Field(() => Team)
  @ManyToOne(type => Team)
  @JoinColumn({ name: 'winnerId' })
  winner?: Team | null = null;

  @Column({ type: 'int', nullable: true })
  winnerId?: number;

  @Column()
  @Field()
  team1_points: number = 0;

  @Column()
  @Field()
  team2_points: number = 0;

  @Field(() => Tournament, { nullable: true })
  @ManyToOne(type => Tournament)
  @JoinColumn({ name: 'tournamentId' })
  tournament?: Tournament;

  @Column({ nullable: true })
  tournamentId?: number;

  @Column('boolean', { default: false })
  @Field()
  is_finished: boolean = false;

  @Column({ nullable: true })
  @Field({ nullable: true })
  finishedAt?: Date;

  @CreateDateColumn({ type: 'timestamp' })
  @Field()
  createdAt: Date = new Date();
}
