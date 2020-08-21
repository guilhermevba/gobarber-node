import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class UpdateAppointmentProviderType1597977749144 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('appointments', 'provider_id')
      await queryRunner.addColumn('appointments', new TableColumn({
        name: 'provider_id',
        type: 'uuid'
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('appointments', 'provider_id')
      await queryRunner.addColumn('appointments', new TableColumn({
        name: 'provider_id',
        type: 'varchar'
      }))
    }

}
