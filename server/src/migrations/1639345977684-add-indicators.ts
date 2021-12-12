import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { TABLE_NAMES } from '../config/constants/table-names';

export class indicatorTypes1639345977684 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: TABLE_NAMES.INDICATOR_TYPES,
      columns: [
        {
          name: 'name',
          type: 'varchar',
          isPrimary: true
        },
      ]
    }), true);

    queryRunner
      .manager
      .createQueryBuilder()
      .insert()
      .into(TABLE_NAMES.INDICATOR_TYPES)
      .values([
        {
          name: 'STRING'
        },
        {
          name: 'STRING_ARRAY'
        },
        {
          name: 'NUMBER'
        },
        {
          name: 'BOOLEAN'
        },
        {
          name: 'NUMBER_ARRAY'
        },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TABLE_NAMES.INDICATOR_TYPES);
  }

}
