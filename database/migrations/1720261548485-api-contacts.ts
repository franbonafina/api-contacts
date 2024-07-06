import { MigrationInterface, QueryRunner } from 'typeorm';

export class ApiContacts1720261548485 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS my_table`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {

  }
}
