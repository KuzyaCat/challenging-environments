import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

import { Country } from '../country/country.entity';
import { Division } from '../division/division.entity';
import { Environment } from '../environment/environment.entity';
import { Region } from '../region/region.entity';
import { TeamPlayer } from '../team-player/team-player.entity';
import { Player } from '../player/player.entity';
import { TABLE_NAMES } from '../config/constants/table-names';

@Entity({ name: TABLE_NAMES.TEAMS })
@ObjectType()
export class Team {
  @PrimaryColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  logo?: string;

  @Column({ type: 'varchar' })
  @Field()
  @ManyToOne(type => Country)
  @JoinColumn({ name: 'country' })
  country: Country;

  @Column({ type: 'varchar' })
  @Field()
  @ManyToOne(type => Region)
  @JoinColumn({ name: 'region' })
  region: Region;

  @Column({ type: 'varchar' })
  @Field()
  @ManyToOne(type => Division)
  @JoinColumn({ name: 'division' })
  division: Division;

  @Column({ type: 'varchar' })
  @Field()
  @ManyToOne(type => Environment)
  @JoinColumn({ name: 'environment' })
  environment: Environment;

  @Column()
  @Field()
  isNational: boolean = false;

  @Column()
  @Field()
  active?: boolean = true;

  @Column()
  @Field()
  evaluation?: number = 0;

  @Column()
  @Field()
  matches?: number = 0;

  @Column()
  @Field()
  wins?: number = 0;

  @Column()
  @Field()
  draws?: number = 0;

  @Column()
  @Field()
  loses?: number = 0;

  @Column()
  @Field()
  points_earned?: number = 0;

  @Column()
  @Field()
  enemy_points_earned?: number = 0;

  @Column()
  @Field()
  points_difference?: number = 0;

  @OneToMany(type => TeamPlayer, teamPlayer => teamPlayer.team)
  teamPlayers: TeamPlayer[];

  @Field(() => [Player])
  players: Player[];
}

