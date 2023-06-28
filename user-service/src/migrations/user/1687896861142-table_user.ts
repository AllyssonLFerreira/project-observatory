import { MigrationInterface, QueryRunner } from 'typeorm';

export class TableUser1687896861142 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
      CREATE TABLE users (
        user_id SERIAL PRIMARY KEY NOT NULL,
        user_name dm_username NOT NULL,
        user_email dm_username UNIQUE NOT NULL,
        user_password VARCHAR(255) NOT NULL,
        user_username dm_username UNIQUE NOT NULL,
        user_birthday DATE,
        created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
        updated_at timestamp with time zone
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DROP TABLE users
    `);
  }
}
