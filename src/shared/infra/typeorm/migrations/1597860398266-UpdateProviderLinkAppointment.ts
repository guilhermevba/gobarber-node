import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";
import { query } from "express";

export class UpdateProviderLinkAppointment1597860398266 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('appointments', 'provider_id')
      await queryRunner.addColumn('appointments', new TableColumn({
        name: 'provider_id',
        type: 'uuid',
        isNullable: false
      }))
      await queryRunner.createForeignKey('appointments',
        new TableForeignKey({
          name: 'appointmentProvider',
          columnNames: ['provider_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'users',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('appointments', 'appointmentProvider')
      await queryRunner.dropColumn('appointments', 'provider_id')
      await queryRunner.addColumn('appointments', new TableColumn({
        name: 'provider_id',
        type: 'varchar'
      }))

    }

}
