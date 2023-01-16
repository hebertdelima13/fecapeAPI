import { MigrationInterface, QueryRunner } from "typeorm";

export class default1672927936903 implements MigrationInterface {
    name = 'default1672927936903'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "championships" RENAME COLUMN "step" TO "stage"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "championships" RENAME COLUMN "stage" TO "step"`);
    }

}
