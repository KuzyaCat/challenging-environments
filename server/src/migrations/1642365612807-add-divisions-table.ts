import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

import { TABLE_NAMES } from '../config/constants/table-names';

const TABLE_NAME = TABLE_NAMES.DIVISIONS;

export class addDivisionsTable1642365612807 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: TABLE_NAME,
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'tier',
            type: 'integer',
          },
          {
            name: 'environment',
            type: 'varchar',
          },
        ]
      }), true);

      await queryRunner.createForeignKey(
        TABLE_NAME,
        new TableForeignKey({
          columnNames: ['environment'],
          referencedTableName: TABLE_NAMES.ENVIRONMENTS,
          referencedColumnNames: ['name']
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable(TABLE_NAME);
    }

}
