import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTag1727682393317 implements MigrationInterface {
    name = 'AddTag1727682393317'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tag" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "tag" varchar(100) NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tag"`);
    }

}
