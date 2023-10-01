import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

import { Country } from '../country/country.entity';
import { Division } from '../division/division.entity';
import { Environment } from '../environment/environment.entity';
import { Region } from '../region/region.entity';
import { TeamPlayer } from '../team-player/team-player.entity';
import { Player } from '../player/player.entity';
import { Award } from '../award/award.entity';
import { Match } from '../match/match.entity';

import { TABLE_NAMES } from '../config/constants/table-names';

@Entity({ name: TABLE_NAMES.TEAMS })
@ObjectType()
export class Team {
  @PrimaryGeneratedColumn('increment')
  @Field()
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  logo?: string;

  @Field()
  @ManyToOne(type => Country)
  @JoinColumn({ name: 'countryId' })
  country: Country;

  @Column({ type: 'varchar' })
  countryId?: string;

  @Field()
  @ManyToOne(type => Region)
  @JoinColumn({ name: 'regionId' })
  region: Region;

  @Column({ type: 'varchar' })
  regionId?: string;

  @Field()
  @ManyToOne(type => Division)
  @JoinColumn({ name: 'divisionId' })
  division: Division;

  @Column({ type: 'int' })
  divisionId?: number;

  @Field()
  @ManyToOne(type => Environment)
  @JoinColumn({ name: 'environmentId' })
  environment: Environment;

  @Column({ type: 'varchar' })
  environmentId?: string;

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

  @Field(() => [Award])
  @OneToMany(type => Award, award => award.id)
  awards: Award[];

  @Field(() => [Player])
  players: Player[];

  @Field(() => [Match])
  latestMatches: Match[];
}
