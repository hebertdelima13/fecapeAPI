import { MigrationInterface, QueryRunner } from "typeorm";

export class default1675179456918 implements MigrationInterface {
    name = 'default1675179456918'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "news" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "news" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

}
