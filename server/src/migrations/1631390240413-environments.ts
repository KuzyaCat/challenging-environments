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
        },
        {
          name: 'withCountries',
          type: 'varchar',
          default: true,
        },
        {
          name: 'withTeams',
          type: 'varchar',
          default: true,
        },
        {
          name: 'deleted',
          type: 'bool',
          default: false,
        }

      ]
    }), true)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TABLE_NAMES.ENVIRONMENTS);
  }

}
