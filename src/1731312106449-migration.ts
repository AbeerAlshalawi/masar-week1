import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1731312106449 implements MigrationInterface {
    name = 'Migration1731312106449'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Users" ("id" SERIAL NOT NULL, "fullName" character varying NOT NULL, "age" integer NOT NULL, CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Users"`);
    }

}
