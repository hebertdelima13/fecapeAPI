import { MigrationInterface, QueryRunner } from "typeorm";

export class default1675176443929 implements MigrationInterface {
    name = 'default1675176443929'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "clubs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, CONSTRAINT "UQ_5faeec2f663968ba35f61fe46d6" UNIQUE ("name"), CONSTRAINT "PK_bb09bd0c8d5238aeaa8f86ee0d4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "athletes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "club_id" uuid, CONSTRAINT "UQ_bf714f077f7400fb09ec67b3b02" UNIQUE ("name"), CONSTRAINT "PK_3b92d2bd187b2b2d27d4c47f1c4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "championships" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "registered" integer NOT NULL, "typeOfChamp" text NOT NULL, "category" text NOT NULL, "stage" text NOT NULL, CONSTRAINT "UQ_4263776de1abe4910604a517c1f" UNIQUE ("name"), CONSTRAINT "PK_0f99e3669ee9b045b47cc8c916d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "results" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "board" text NOT NULL, "sort" text NOT NULL, "scores" boolean NOT NULL DEFAULT false, "quantity" integer NOT NULL DEFAULT '0', "totalWeight" numeric NOT NULL DEFAULT '0', "greaterWeight" numeric NOT NULL DEFAULT '0', "points" integer NOT NULL DEFAULT '0', "lostPoints" integer NOT NULL DEFAULT '0', "championship_id" uuid, "athlete_id" uuid, CONSTRAINT "PK_e8f2a9191c61c15b627c117a678" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "news" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "image" text NOT NULL, "content" text NOT NULL, CONSTRAINT "PK_39a43dfcb6007180f04aff2357e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "athletes" ADD CONSTRAINT "FK_b960bfe041a011c25863de15859" FOREIGN KEY ("club_id") REFERENCES "clubs"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "results" ADD CONSTRAINT "FK_676b69e6a5d7727eddca9f05689" FOREIGN KEY ("championship_id") REFERENCES "championships"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "results" ADD CONSTRAINT "FK_73c0b2ebcefc54bfa9d00552f25" FOREIGN KEY ("athlete_id") REFERENCES "athletes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "results" DROP CONSTRAINT "FK_73c0b2ebcefc54bfa9d00552f25"`);
        await queryRunner.query(`ALTER TABLE "results" DROP CONSTRAINT "FK_676b69e6a5d7727eddca9f05689"`);
        await queryRunner.query(`ALTER TABLE "athletes" DROP CONSTRAINT "FK_b960bfe041a011c25863de15859"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "news"`);
        await queryRunner.query(`DROP TABLE "results"`);
        await queryRunner.query(`DROP TABLE "championships"`);
        await queryRunner.query(`DROP TABLE "athletes"`);
        await queryRunner.query(`DROP TABLE "clubs"`);
    }

}
