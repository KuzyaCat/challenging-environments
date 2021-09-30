import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

import { Region } from '../region/region.entity';

@Entity()
@ObjectType()
export class Country {
  @PrimaryColumn()
  @Field()
  name: string;

  @Column()
  @Field()
  icon: string;

  @Column({ type: 'varchar' })
  @Field()
  @ManyToOne(type => Region, region => region.name)
  region: Region;
}

