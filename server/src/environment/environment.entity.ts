import { Entity, PrimaryColumn, Column } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

import { TABLE_NAMES } from '../config/constants/table-names';

@Entity({ name: TABLE_NAMES.ENVIRONMENTS })
@ObjectType()
export class Environment {
  @PrimaryColumn()
  @Field()
  name: string;

  @Column()
  @Field()
  deleted: boolean = false;
}
