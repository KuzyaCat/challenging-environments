import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

import { Country } from '../country/country.entity';
import { Environment } from '../environment/environment.entity';
import { TeamPlayer } from '../team-player/team-player.entity';
import { Award } from '../award/award.entity';
import { PlayerPlayerIndicator } from '../player-player-indicator/player-player-indicator.entity';
import { PlayerIndicator } from '../player-indicator/player-indicator.entity';

import { TABLE_NAMES } from '../config/constants/table-names';
import { PLAYER_ROLE, PLAYER_POSITION  } from '../config/constants';

@Entity({ name: TABLE_NAMES.PLAYERS })
@ObjectType()
export class Player {
  @PrimaryColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  firstname?: string;

  @Column()
  @Field()
  lastname: string;

  @Column()
  @Field()
  age: number;

  @Column()
  @Field()
  matches: number;

  @Column()
  @Field()
  points_earned: number = 0;

  @Column()
  @Field()
  assists_earned: number = 0;

  @Column()
  @Field()
  evaluation: number;

  @Column()
  @Field()
  photo?: string;

  @Column()
  @Field()
  role?: PLAYER_ROLE;

  @Column()
  @Field()
  active: boolean = true;

  @Column({ type: 'varchar' })
  @Field()
  @ManyToOne(type => Country)
  @JoinColumn({ name: 'country' })
  country: Country;

  @Column({ type: 'varchar' })
  @Field()
  @ManyToOne(type => Environment)
  @JoinColumn({ name: 'environment' })
  environment: Environment;

  @OneToMany(type => TeamPlayer, teamPlayer => teamPlayer.player)
  teamPlayers: TeamPlayer[];

  @Field()
  position: PLAYER_POSITION;

  @OneToMany(type => Award, award => award.id)
  playerAwards: Award[];

  @OneToMany(type => PlayerPlayerIndicator, playerPlayerIndicator => playerPlayerIndicator.id)
  playerPlayerIndicators: PlayerPlayerIndicator[];

  @Field(() => [Award])
  awards: Award[];

  @Field(() => [PlayerIndicator])
  indicators: PlayerIndicator[];
}
