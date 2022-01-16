import { Entity, PrimaryColumn, Column } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

import { TABLE_NAMES } from '../config/constants/table-names';

@Entity()
@ObjectType()
export class Environment {
  @PrimaryColumn()
  @Field()
  name: string;

  @Column()
  @Field()
  withCountries: boolean = true;

  @Column()
  @Field()
  withTeams: boolean = true;

  @Column()
  @Field()
  deleted: boolean = false;
}
