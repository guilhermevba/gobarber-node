import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";
import { query } from "express";

export default class AddAvatarToUsers1593648682521 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      queryRunner.addColumn('users', new TableColumn({
        name:'avatar',
        type: 'varchar',
        isNullable: true
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      queryRunner.dropColumn('users', 'avatar')
    }

}
