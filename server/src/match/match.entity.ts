import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToMany, CreateDateColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

import { Environment } from '../environment/environment.entity';
import { Team } from '../team/team.entity';

import { TABLE_NAMES } from '../config/constants/table-names';

@Entity({ name: TABLE_NAMES.MATCHES })
@ObjectType()
export class Match {
  @PrimaryColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  @ManyToOne(type => Environment)
  @JoinColumn({ name: 'environment' })
  environment: Environment;

  @Column({ type: 'int' })
  @Field(() => Team)
  @ManyToOne(type => Team)
  @JoinColumn({ name: 'team1' })
  team1: Team;

  @Column({ type: 'int' })
  @Field(() => Team)
  @ManyToOne(type => Team)
  @JoinColumn({ name: 'team2' })
  team2: Team;

  @Column({ type: 'int' })
  @Field(() => Team)
  @ManyToOne(type => Team)
  @JoinColumn({ name: 'winner' })
  winner: Team | null = null;

  @Column()
  @Field()
  team1_points: number = 0;

  @Column()
  @Field()
  team2_points: number = 0;

  // TODO: tournament

  @Column('boolean', { default: false })
  @Field()
  is_finished: boolean = false;

  @Column()
  @Field()
  finishedAt: Date = new Date();

  @CreateDateColumn({ type: 'timestamp' })
  @Field()
  createdAt: Date;
}
