import { MigrationInterface, QueryRunner } from "typeorm";

export class Base1727443925733 implements MigrationInterface {
    name = 'Base1727443925733'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(100) NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "ad" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(100) NOT NULL, "description" varchar(500) NOT NULL, "owner" varchar(100) NOT NULL, "price" integer NOT NULL, "picture" varchar NOT NULL, "location" varchar(100) NOT NULL, "categoryIdId" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_ad" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(100) NOT NULL, "description" varchar(500) NOT NULL, "owner" varchar(100) NOT NULL, "price" integer NOT NULL, "picture" varchar NOT NULL, "location" varchar(100) NOT NULL, "categoryIdId" integer, CONSTRAINT "FK_2c064c2bd97eb075128152c82fe" FOREIGN KEY ("categoryIdId") REFERENCES "category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_ad"("id", "title", "description", "owner", "price", "picture", "location", "categoryIdId") SELECT "id", "title", "description", "owner", "price", "picture", "location", "categoryIdId" FROM "ad"`);
        await queryRunner.query(`DROP TABLE "ad"`);
        await queryRunner.query(`ALTER TABLE "temporary_ad" RENAME TO "ad"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ad" RENAME TO "temporary_ad"`);
        await queryRunner.query(`CREATE TABLE "ad" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(100) NOT NULL, "description" varchar(500) NOT NULL, "owner" varchar(100) NOT NULL, "price" integer NOT NULL, "picture" varchar NOT NULL, "location" varchar(100) NOT NULL, "categoryIdId" integer)`);
        await queryRunner.query(`INSERT INTO "ad"("id", "title", "description", "owner", "price", "picture", "location", "categoryIdId") SELECT "id", "title", "description", "owner", "price", "picture", "location", "categoryIdId" FROM "temporary_ad"`);
        await queryRunner.query(`DROP TABLE "temporary_ad"`);
        await queryRunner.query(`DROP TABLE "ad"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
