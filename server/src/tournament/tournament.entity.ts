import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

import { Team } from '../team/team.entity';
import { Environment } from '../environment/environment.entity';

import { TABLE_NAMES } from '../config/constants/table-names';

@Entity({ name: TABLE_NAMES.TOURNAMENTS })
@ObjectType()
export class Tournament {
  @PrimaryGeneratedColumn('increment')
  @Field()
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  tier: number;

  @Field(() => Team, { nullable: true })
  @ManyToOne(type => Team, team => team.id)
  @JoinColumn({ name: 'winnerId' })
  winner?: Team;

  @Column({ type: 'int', nullable: true })
  winnerId: number;

  @Field()
  @ManyToOne(type => Environment, environment => environment.name)
  @JoinColumn({ name: 'environmentId' })
  environment: Environment;

  @Column({ type: 'varchar' })
  environmentId: string;

  @Column()
  @Field()
  isFinished: boolean = false;

  @Column()
  @Field()
  deleted: boolean = false;

  @Column()
  @Field()
  createdAt: Date = new Date();
}
