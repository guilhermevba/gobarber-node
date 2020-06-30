import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";
import { MongoQueryRunner } from "typeorm/driver/mongodb/MongoQueryRunner";

export default class AlterProviderFieldToProviderId1593480309528 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('appointments', 'provider')
      await queryRunner.addColumn('appointments', new TableColumn({
        name: 'provider_id',
        type: 'uuid',
        isNullable: true,
      }))
      await queryRunner.createForeignKey('appointments', new TableForeignKey({
        name: 'appointment_provider',
        columnNames: ['provider_id'],
        referencedColumnNames:['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('appointments', 'appointment_provider')
      await queryRunner.dropColumn('appointments', 'provider_id')
      await queryRunner.addColumn('appointments', new TableColumn({
        name: 'provider',
        type: 'string'
      }))
    }
}