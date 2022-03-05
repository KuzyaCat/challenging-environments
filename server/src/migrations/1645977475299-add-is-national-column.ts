import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

import { TABLE_NAMES } from '../config/constants/table-names';

const TABLE_NAME = TABLE_NAMES.TEAMS;

export class addIsNationalColumn1645977475299 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn(TABLE_NAME, "isNational");
      await queryRunner.addColumn(TABLE_NAME, new TableColumn({
        name: "is_national",
        type: "bool",
        default: false
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }
}
