import { MigrationInterface, TableForeignKey, QueryRunner, Table } from 'typeorm';

import { TABLE_NAMES } from '../config/constants/table-names';

const TABLE_NAME = TABLE_NAMES.COUNTRIES;

export class addCountriesTable1631398893956 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: TABLE_NAME,
        columns: [
          {
            name: 'name',
            type: 'varchar',
            isPrimary: true
          },
          {
            name: 'region',
            type: 'varchar'
          }

        ]
      }), true)

      await queryRunner.createForeignKey(
        TABLE_NAME,
        new TableForeignKey({
          columnNames: ['region'],
          referencedTableName: TABLE_NAMES.REGIONS,
          referencedColumnNames: ['name']
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable(TABLE_NAME);
    }

}
