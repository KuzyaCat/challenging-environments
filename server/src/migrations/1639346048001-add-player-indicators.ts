import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

import { TABLE_NAMES } from '../config/constants/table-names';

const TABLE_NAME = TABLE_NAMES.PLAYER_INDICATORS;

export class addPlayerIndicators1639346048001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: TABLE_NAME,
      columns: [
        {
          name: 'id',
          type: 'varchar',
          isPrimary: true
        },
        {
          name: 'name',
          type: 'varchar',
        },
        {
          name: 'type',
          type: 'varchar',
        },
        {
          name: 'environment',
          type: 'varchar',
        },
        {
          name: 'is_primary',
          type: 'bool',
          default: false
        },
      ]
    }), true);

    await queryRunner.createForeignKey(
      TABLE_NAME,
      new TableForeignKey({
        columnNames: ['type'],
        referencedTableName: TABLE_NAMES.INDICATOR_TYPES,
        referencedColumnNames: ['name']
      })
    );

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
