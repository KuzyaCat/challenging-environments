import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

import { PlayerAward } from '../player-award/player-award.entity';
import { TABLE_NAMES } from '../config/constants/table-names';

@Entity({ name: TABLE_NAMES.AWARDS })
@ObjectType()
export class Award {
  @PrimaryColumn()
  @Field()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  tier: number;

  @Field()
  @Column()
  isPlayer: boolean = true;

  @Field()
  @Column()
  isTeam: boolean = false;

  @OneToMany(type => PlayerAward, playerAward => playerAward.award)
  playerAwards: PlayerAward[];
}
