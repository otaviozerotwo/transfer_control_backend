import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1747018842876 implements MigrationInterface {
    name = 'Default1747018842876'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tb_status" ("id" int NOT NULL, "descricao" text NOT NULL, CONSTRAINT "PK_9a700eb4b13e49afb1a9117657e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_usuario" ("id" int NOT NULL IDENTITY(1,1), "nm_usu" text NOT NULL, "email_usu" text NOT NULL, "senha_usu" text NOT NULL, "status_id" int, CONSTRAINT "PK_fea85fa13fe26913a53d66a44db" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tb_usuario" ADD CONSTRAINT "FK_0daf89e62f31c1f840e8e4b55cb" FOREIGN KEY ("status_id") REFERENCES "tb_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_usuario" DROP CONSTRAINT "FK_0daf89e62f31c1f840e8e4b55cb"`);
        await queryRunner.query(`DROP TABLE "tb_usuario"`);
        await queryRunner.query(`DROP TABLE "tb_status"`);
    }

}
