import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { TABLE_NAMES } from '../config/constants/table-names';

export class environments1631390240413 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: TABLE_NAMES.ENVIRONMENTS,
      columns: [
        {
          name: 'name',
          type: 'varchar',
          isPrimary: true
        }
      ]
    }), true)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TABLE_NAMES.ENVIRONMENTS);
  }

}
