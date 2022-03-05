import { Entity, PrimaryColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

import { TABLE_NAMES } from '../config/constants/table-names';

@Entity({ name: TABLE_NAMES.INDICATOR_TYPES })
@ObjectType()
export class IndicatorType {
  @PrimaryColumn()
  @Field()
  name: string;
}

