import { MigrationInterface, QueryRunner } from "typeorm";

export class default1675176826752 implements MigrationInterface {
    name = 'default1675176826752'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news" ALTER COLUMN "createdAt" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news" ALTER COLUMN "createdAt" DROP DEFAULT`);
    }

}
