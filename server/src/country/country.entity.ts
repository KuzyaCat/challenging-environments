import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

import { Region } from '../region/region.entity';
import { TABLE_NAMES } from '../config/constants/table-names';

@Entity({ name: TABLE_NAMES.COUNTRIES })
@ObjectType()
export class Country {
  @PrimaryColumn()
  @Field()
  name: string;

  // @Column()
  // @Field()
  // icon: string;

  @Column({ type: 'varchar' })
  @Field()
  @ManyToOne(type => Region)
  @JoinColumn({ name: 'region' })
  region: Region;
}

