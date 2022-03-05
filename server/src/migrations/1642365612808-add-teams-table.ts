import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

import { TABLE_NAMES } from '../config/constants/table-names';

const TABLE_NAME = TABLE_NAMES.TEAMS;

export class addTeamsTable1642365612808 implements MigrationInterface {

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
            name: 'logo',
            type: 'varchar',
          },
          {
            name: 'country',
            type: 'varchar',
          },
          {
            name: 'division',
            type: 'integer',
          },
          {
            name: 'active',
            type: 'bool',
            default: true
          },
          {
            name: 'evaluation',
            type: 'real',
            default: 0
          },
          {
            name: 'matches',
            type: 'integer',
            default: 0
          },
          {
            name: 'wins',
            type: 'integer',
            default: 0
          },
          {
            name: 'draws',
            type: 'integer',
            default: 0
          },
          {
            name: 'loses',
            type: 'integer',
            default: 0
          },
          {
            name: 'points_earned',
            type: 'integer',
            default: 0
          },
          {
            name: 'enemy_points_earned',
            type: 'integer',
            default: 0
          },
          {
            name: 'points_difference',
            type: 'integer',
            default: 0
          },
        ]
      }), true);

      await queryRunner.createForeignKey(
        TABLE_NAME,
        new TableForeignKey({
          columnNames: ['country'],
          referencedTableName: TABLE_NAMES.COUNTRIES,
          referencedColumnNames: ['name']
        })
      );

      await queryRunner.createForeignKey(
        TABLE_NAME,
        new TableForeignKey({
          columnNames: ['division'],
          referencedTableName: TABLE_NAMES.DIVISIONS,
          referencedColumnNames: ['id']
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable(TABLE_NAME);
    }

}
