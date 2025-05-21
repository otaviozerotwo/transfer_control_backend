import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1747792876278 implements MigrationInterface {
    name = 'Default1747792876278'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tb_usuario" ("id" int NOT NULL IDENTITY(1,1), "nm_usu" varchar(255) NOT NULL, "email_usu" varchar(255) NOT NULL, "pass_usu" varchar(255) NOT NULL, "st_usu" int NOT NULL CONSTRAINT "DF_b8b3fd56b656318a063e54b7344" DEFAULT 1, "createdAt" datetime NOT NULL CONSTRAINT "DF_e8fb2d73b2e2a11723ed9ce8700" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_1f890252dc88de08fe9f7adad0c" DEFAULT getdate(), "resetPasswordToken" varchar(255), "resetPasswordExpires" datetime, CONSTRAINT "UQ_ddf0cf98fc011f0b481038aef61" UNIQUE ("email_usu"), CONSTRAINT "PK_fea85fa13fe26913a53d66a44db" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tb_usuario"`);
    }

}
